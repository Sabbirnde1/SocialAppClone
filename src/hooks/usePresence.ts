import { useEffect, useState } from "react";
import { backendClient } from "@/integrations/backend/client";
import { useAuth } from "@/contexts/AuthContext";

export interface UserPresence {
  user_id: string;
  online_at: string;
  typing?: boolean;
}

export const usePresence = (channelName: string) => {
  const { user } = useAuth();
  const [presenceState, setPresenceState] = useState<Record<string, UserPresence[]>>({});
  const [channel, setChannel] = useState<ReturnType<typeof backendClient.channel> | null>(null);

  useEffect(() => {
    if (!user) return;

    const presenceChannel = backendClient.channel(channelName, {
      config: {
        presence: {
          key: user.id,
        },
      },
    });

    presenceChannel
      .on("presence", { event: "sync" }, () => {
        const state = presenceChannel.presenceState<UserPresence>();
        setPresenceState(state);
      })
      .on("presence", { event: "join" }, ({ key, newPresences }) => {
        console.log("User joined:", key, newPresences);
      })
      .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
        console.log("User left:", key, leftPresences);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await presenceChannel.track({
            user_id: user.id,
            online_at: new Date().toISOString(),
            typing: false,
          });

          // Update last_seen_at in database
          await backendClient
            .from("profiles")
            .update({ last_seen_at: new Date().toISOString() })
            .eq("id", user.id);
        }
      });

    setChannel(presenceChannel);

    // Update last_seen_at periodically (every 30 seconds)
    const interval = setInterval(async () => {
      if (user) {
        await backendClient
          .from("profiles")
          .update({ last_seen_at: new Date().toISOString() })
          .eq("id", user.id);
      }
    }, 30000);

    return () => {
      presenceChannel.unsubscribe();
      clearInterval(interval);
    };
  }, [user, channelName]);

  const updateTypingStatus = async (isTyping: boolean) => {
    if (!channel || !user) return;

    await channel.track({
      user_id: user.id,
      online_at: new Date().toISOString(),
      typing: isTyping,
    });
  };

  const isUserOnline = (userId: string): boolean => {
    const userPresences = Object.values(presenceState).flat();
    const userPresence = userPresences.find((p) => p.user_id === userId);
    
    if (!userPresence) return false;

    // Consider user online if they were active in the last 5 minutes
    const lastSeen = new Date(userPresence.online_at);
    const now = new Date();
    const diffMinutes = (now.getTime() - lastSeen.getTime()) / 1000 / 60;
    
    return diffMinutes < 5;
  };

  const isUserTyping = (userId: string): boolean => {
    const userPresences = Object.values(presenceState).flat();
    const userPresence = userPresences.find((p) => p.user_id === userId);
    return userPresence?.typing || false;
  };

  return {
    presenceState,
    updateTypingStatus,
    isUserOnline,
    isUserTyping,
  };
};

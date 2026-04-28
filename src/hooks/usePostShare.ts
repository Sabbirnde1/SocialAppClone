import { useMutation, useQueryClient } from "@tanstack/react-query";
import { backendClient } from "@/integrations/backend/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const usePostShare = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const sharePost = useMutation({
    mutationFn: async ({
      postId,
      sharedVia,
    }: {
      postId: string;
      sharedVia: "repost" | "message" | "link";
    }) => {
      if (!user) throw new Error("Not authenticated");

      const { error } = await backendClient.from("post_shares").insert({
        post_id: postId,
        user_id: user.id,
        shared_via: sharedVia,
      });

      if (error) {
        // If already shared, just show success
        if (error.code === "23505") {
          return;
        }
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to share post");
    },
  });

  const repostToFeed = useMutation({
    mutationFn: async ({ postId, content }: { postId: string; content: string }) => {
      if (!user) throw new Error("Not authenticated");

      // Create a new post as a repost
      const { error: postError } = await backendClient.from("posts").insert({
        author_id: user.id,
        content: content,
      });

      if (postError) throw postError;

      // Track the share
      await backendClient.from("post_shares").insert({
        post_id: postId,
        user_id: user.id,
        shared_via: "repost",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post shared to your feed!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to repost");
    },
  });

  const copyPostLink = async (postId: string) => {
    const url = `${window.location.origin}/post/${postId}`;
    
    try {
      await navigator.clipboard.writeText(url);
      
      // Track the share
      if (user) {
        await backendClient.from("post_shares").insert({
          post_id: postId,
          user_id: user.id,
          shared_via: "link",
        });
      }
      
      toast.success("Link copied to clipboard!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  return {
    sharePost,
    repostToFeed,
    copyPostLink,
  };
};

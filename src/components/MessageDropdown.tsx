import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMessages } from "@/hooks/useMessages";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";

const MessageDropdown = () => {
  const { conversations } = useMessages();
  
  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unread_count, 0);
  const recentConversations = conversations.slice(0, 5);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative text-foreground hover:bg-white/50">
          <MessageSquare className="h-5 w-5" />
          {totalUnread > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {totalUnread > 9 ? "9+" : totalUnread}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-0 bg-background border shadow-lg z-50" 
        align="end"
        sideOffset={8}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-foreground">Messages</h3>
          <Link to="/messages">
            <Button variant="ghost" size="sm" className="text-xs text-primary hover:text-primary/90">
              View All
            </Button>
          </Link>
        </div>
        
        <ScrollArea className="h-[320px]">
          {recentConversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground/50 mb-2" />
              <p className="text-sm text-muted-foreground">No messages yet</p>
            </div>
          ) : (
            <div className="divide-y">
              {recentConversations.map((conversation) => (
                <Link
                  key={conversation.user_id}
                  to={`/messages?user=${conversation.user_id}`}
                  className="flex items-start gap-3 p-4 hover:bg-accent transition-colors"
                >
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarImage src={conversation.avatar_url || ""} />
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className={`text-sm truncate ${conversation.unread_count > 0 ? 'font-semibold' : 'font-medium'}`}>
                        {conversation.full_name}
                      </p>
                      {conversation.unread_count > 0 && (
                        <Badge variant="destructive" className="h-5 px-1.5 text-xs flex-shrink-0">
                          {conversation.unread_count}
                        </Badge>
                      )}
                    </div>
                    <p className={`text-xs text-muted-foreground truncate ${conversation.unread_count > 0 ? 'font-medium' : ''}`}>
                      {conversation.last_message}
                    </p>
                    <p className="text-xs text-muted-foreground/70 mt-1">
                      {formatDistanceToNow(new Date(conversation.last_message_time), { addSuffix: true })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default MessageDropdown;

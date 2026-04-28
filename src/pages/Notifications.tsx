import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Home, 
  Users, 
  BookOpen, 
  MessageSquare, 
  Bell, 
  User, 
  Search,
  UserPlus,
  MessageCircle,
  ThumbsUp,
  CheckCircle2,
  X
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useNotifications } from "@/hooks/useNotifications";
import { useMessages } from "@/hooks/useMessages";
import { formatDistanceToNow } from "date-fns";
import { NotificationsSkeleton } from "@/components/NotificationsSkeleton";
import { AppHeader } from "@/components/AppHeader";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { useState } from "react";

const Notifications = () => {
  const navigate = useNavigate();
  const { notifications, unreadCount, isLoading, markAsRead, markAllAsRead, deleteNotification } = useNotifications();
  const { conversations, isLoading: messagesLoading } = useMessages();
  const [activeTab, setActiveTab] = useState("notifications");
  
  const totalUnreadMessages = conversations.reduce((sum, conv) => sum + conv.unread_count, 0);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "friend_request":
        return <UserPlus className="h-5 w-5" />;
      case "friend_accepted":
        return <CheckCircle2 className="h-5 w-5" />;
      case "new_message":
        return <MessageCircle className="h-5 w-5" />;
      case "post_like":
        return <ThumbsUp className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "friend_request":
        return "bg-blue-500";
      case "friend_accepted":
        return "bg-green-500";
      case "new_message":
        return "bg-primary";
      case "post_like":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getNotificationAction = (type: string) => {
    switch (type) {
      case "friend_request":
        return { label: "View Requests", path: "/pending-requests" };
      case "new_message":
        return { label: "View Messages", path: "/messages" };
      case "friend_accepted":
        return { label: "View Friends", path: "/friends" };
      default:
        return null;
    }
  };

  const handleNotificationClick = (notification: any) => {
    if (!notification.is_read) {
      markAsRead.mutate(notification.id);
    }
    
    const action = getNotificationAction(notification.type);
    if (action) {
      navigate(action.path);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background pb-16 lg:pb-0">
      {/* Header */}
      <AppHeader currentPage="notifications" />

      {/* Main Content */}
      <main className="flex-1 px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">Activity</h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Stay updated with your notifications and messages
              </p>
            </div>
            {activeTab === "notifications" && unreadCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => markAllAsRead.mutate()}
                disabled={markAllAsRead.isPending}
                className="self-start sm:self-auto"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Mark all as read</span>
                <span className="sm:hidden">Mark read</span>
              </Button>
            )}
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-4 sm:mb-6">
              <TabsTrigger value="notifications" className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
                <Bell className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Notifications</span>
                <span className="xs:hidden">Notifs</span>
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="h-4 sm:h-5 px-1 sm:px-1.5 text-[10px] sm:text-xs ml-1">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
                <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Messages</span>
                <span className="xs:hidden">Msgs</span>
                {totalUnreadMessages > 0 && (
                  <Badge variant="destructive" className="h-4 sm:h-5 px-1 sm:px-1.5 text-[10px] sm:text-xs ml-1">
                    {totalUnreadMessages}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              {/* Notifications List */}
          <div className="space-y-3">
            {isLoading ? (
              <NotificationsSkeleton />
            ) : notifications.length === 0 ? (
              <Card className="p-8 sm:p-12 text-center">
                <Bell className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                  No notifications yet
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  When you get notifications, they'll show up here
                </p>
              </Card>
            ) : (
              notifications.map((notification) => {
                const action = getNotificationAction(notification.type);
                
                return (
                  <Card
                    key={notification.id}
                    className={`transition-all hover:shadow-md ${
                      !notification.is_read ? "bg-accent border-l-4 border-l-primary" : ""
                    }`}
                  >
                    <div className="p-3 sm:p-4">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div
                          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${getNotificationColor(
                            notification.type
                          )} flex items-center justify-center flex-shrink-0 text-white`}
                        >
                          {getNotificationIcon(notification.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 sm:gap-4">
                            <div className="flex-1 min-w-0">
                              <p
                                className={`text-xs sm:text-sm ${
                                  !notification.is_read ? "font-semibold" : ""
                                }`}
                              >
                                {notification.content}
                              </p>
                              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                                {formatDistanceToNow(new Date(notification.created_at), {
                                  addSuffix: true,
                                })}
                              </p>
                            </div>
                            
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 flex-shrink-0"
                              onClick={() => deleteNotification.mutate(notification.id)}
                              disabled={deleteNotification.isPending}
                            >
                              {deleteNotification.isPending ? (
                                <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <X className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                          
                          {action && (
                            <div className="mt-3">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleNotificationClick(notification)}
                              >
                                {action.label}
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })
            )}
              </div>
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages">
              <div className="space-y-3">
                {messagesLoading ? (
                  <NotificationsSkeleton />
                ) : conversations.length === 0 ? (
                  <Card className="p-8 sm:p-12 text-center">
                    <MessageSquare className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                      No messages yet
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Start a conversation with your friends
                    </p>
                  </Card>
                ) : (
                  conversations.map((conversation) => (
                    <Card
                      key={conversation.user_id}
                      className={`transition-all hover:shadow-md cursor-pointer ${
                        conversation.unread_count > 0 ? "bg-accent border-l-4 border-l-primary" : ""
                      }`}
                      onClick={() => navigate(`/messages?user=${conversation.user_id}`)}
                    >
                      <div className="p-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12 flex-shrink-0">
                            <AvatarImage src={conversation.avatar_url || ""} />
                            <AvatarFallback>
                              <User className="h-6 w-6" />
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <p
                                    className={`text-sm ${
                                      conversation.unread_count > 0 ? "font-semibold" : "font-medium"
                                    }`}
                                  >
                                    {conversation.full_name}
                                  </p>
                                  {conversation.unread_count > 0 && (
                                    <Badge variant="destructive" className="h-5 px-1.5 text-xs">
                                      {conversation.unread_count}
                                    </Badge>
                                  )}
                                </div>
                                <p className={`text-sm text-muted-foreground line-clamp-2 ${
                                  conversation.unread_count > 0 ? "font-medium" : ""
                                }`}>
                                  {conversation.last_message}
                                </p>
                                <p className="text-xs text-muted-foreground/70 mt-1">
                                  {formatDistanceToNow(new Date(conversation.last_message_time), {
                                    addSuffix: true,
                                  })}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-100 py-6 px-6 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-lg font-semibold text-primary">
              SkillShare<span className="text-sm align-top">Campus</span>
            </span>
          </div>
          <p className="text-sm text-foreground/80">
            © 2025 SkillShareCampus. All rights reserved.
          </p>
        </div>
      </footer>
      
      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};

export default Notifications;

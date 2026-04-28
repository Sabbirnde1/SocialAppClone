import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNotifications } from "@/hooks/useNotifications";
import { Link } from "react-router-dom";

const NotificationBadge = () => {
  const { unreadCount } = useNotifications();

  return (
    <Link to="/notifications">
      <Button variant="ghost" className="relative text-foreground hover:bg-white/50">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </Badge>
        )}
      </Button>
    </Link>
  );
};

export default NotificationBadge;

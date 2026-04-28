import { Link, useLocation } from "react-router-dom";
import { Home, Users, MessageSquare, Bell, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import NotificationBadge from "@/components/NotificationBadge";

export const MobileBottomNav = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const navItems = [
    { id: "campus", icon: Home, label: "Home", path: "/campus" },
    { id: "friends", icon: Users, label: "Friends", path: "/friends" },
    { id: "messages", icon: MessageSquare, label: "Messages", path: "/messages" },
    { id: "notifications", icon: Bell, label: "Alerts", path: "/notifications", hasBadge: true },
    { id: "profile", icon: User, label: "Profile", path: "/profile" },
  ];

  const isActive = (path: string) => {
    if (path === "/campus" && (location.pathname === "/campus" || location.pathname === "/activity")) {
      return true;
    }
    return location.pathname === path;
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-1 flex-1 h-full min-w-[60px] touch-target transition-all duration-200 ${
                active
                  ? "text-primary scale-105"
                  : "text-muted-foreground active:scale-95"
              }`}
            >
              <div className="relative">
                <Icon className={`h-6 w-6 ${active ? "stroke-[2.5]" : "stroke-2"}`} />
                {item.hasBadge && (
                  <div className="absolute -top-1 -right-1">
                    <NotificationBadge />
                  </div>
                )}
              </div>
              <span className={`text-[10px] font-medium ${active ? "font-semibold" : ""}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Home, Users, BookOpen, MessageSquare, User, Search, Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import NotificationBadge from "@/components/NotificationBadge";
import MessageDropdown from "@/components/MessageDropdown";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import campusLogo from "@/assets/campus-logo.png";

interface AppHeaderProps {
  currentPage: "campus" | "activity" | "friends" | "messages" | "profile" | "notifications" | "admin";
}

export const AppHeader = ({ currentPage }: AppHeaderProps) => {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "campus", icon: Home, label: "Home", path: "/campus" },
    { id: "friends", icon: Users, label: "Requests", path: "/friends" },
    { id: "courses", icon: BookOpen, label: "Courses", path: "/campus" },
  ];

  const isActive = (itemId: string) => {
    if (itemId === "campus" && currentPage === "campus") return true;
    if (itemId === "friends" && currentPage === "friends") return true;
    if (itemId === "messages" && currentPage === "messages") return true;
    if (currentPage === "activity" && itemId === "campus") return false;
    return false;
  };

  return (
    <header className="bg-[hsl(var(--header-bg))] py-2 sm:py-3 px-3 sm:px-4 md:px-6 border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo */}
        <Link to={user ? "/campus" : "/"} className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-shrink">
          <img src={campusLogo} alt="Campus Logo" className="h-7 sm:h-8 md:h-10 w-auto flex-shrink-0" />
          <h1 className="text-base sm:text-lg md:text-xl font-semibold text-foreground truncate">
            SkillShare<span className="text-xs md:text-sm align-top">Campus</span>
          </h1>
        </Link>
        
        {/* Desktop Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <Link to="/search" className="w-full">
            <div className="relative cursor-pointer">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search users..." 
                className="pl-10 bg-background/50"
                readOnly
              />
            </div>
          </Link>
        </div>

        {/* Mobile Search Button */}
        <Link 
          to="/search" 
          className="md:hidden p-2 hover:bg-accent rounded-md transition-colors active:bg-accent/80"
          aria-label="Search"
        >
          <Search className="h-5 w-5 sm:h-6 sm:w-6 text-foreground/70" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.id);
            
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  active
                    ? "text-primary"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className={`text-xs whitespace-nowrap ${active ? "font-semibold" : ""}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* Messages Dropdown */}
          <div className="flex flex-col items-center gap-1">
            <MessageDropdown />
            <span className="text-xs text-foreground/70">
              Messages
            </span>
          </div>

          {/* Notifications with Badge */}
          <div className="flex flex-col items-center gap-1">
            <NotificationBadge />
            <span
              className={`text-xs ${
                currentPage === "notifications"
                  ? "font-semibold text-primary"
                  : "text-foreground/70"
              }`}
            >
              Notifications
            </span>
          </div>

          {/* Profile */}
          <Link
            to="/profile"
            className={`flex flex-col items-center gap-1 transition-colors ${
              currentPage === "profile" || currentPage === "activity"
                ? "text-primary"
                : "text-foreground/70 hover:text-foreground"
            }`}
          >
            <User className="h-5 w-5" />
            <span
              className={`text-xs ${
                currentPage === "profile" || currentPage === "activity"
                  ? "font-semibold"
                  : ""
              }`}
            >
              {currentPage === "activity" ? "Activity" : "Me"}
            </span>
          </Link>
        </nav>

        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <button className="p-1.5 sm:p-2 hover:bg-accent rounded-md transition-colors">
              <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[260px] sm:w-[280px] bg-background z-[60]">
            <nav className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.id);
                
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/70 hover:bg-accent"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className={`text-base ${active ? "font-semibold" : ""}`}>
                      {item.label}
                    </span>
                  </Link>
                );
              })}

              {/* Messages */}
              <Link
                to="/messages"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  currentPage === "messages"
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:bg-accent"
                }`}
              >
                <MessageSquare className="h-5 w-5" />
                <span className={`text-base ${currentPage === "messages" ? "font-semibold" : ""}`}>
                  Messages
                </span>
              </Link>

              {/* Notifications */}
              <Link
                to="/notifications"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  currentPage === "notifications"
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:bg-accent"
                }`}
              >
                <div className="relative">
                  <NotificationBadge />
                </div>
                <span className={`text-base ${currentPage === "notifications" ? "font-semibold" : ""}`}>
                  Notifications
                </span>
              </Link>

              {/* Profile */}
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  currentPage === "profile" || currentPage === "activity"
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:bg-accent"
                }`}
              >
                <User className="h-5 w-5" />
                <span className={`text-base ${currentPage === "profile" || currentPage === "activity" ? "font-semibold" : ""}`}>
                  {currentPage === "activity" ? "Activity" : "Profile"}
                </span>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

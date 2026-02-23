import { Search, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Images,
  Users,
  MessageCircle,
  Upload,
  Camera,
} from "lucide-react";

const navItems = [
  { title: "Dashboard", url: "/app", icon: LayoutDashboard },
  { title: "Gallery", url: "/app/gallery", icon: Images },
  { title: "People", url: "/app/people", icon: Users },
  { title: "Chat", url: "/app/chat", icon: MessageCircle },
  { title: "Upload", url: "/app/upload", icon: Upload },
];

export function AppNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="flex items-center gap-4 px-4 h-14">
          {/* Mobile logo */}
          <div className="flex md:hidden items-center gap-2">
            <div className="gradient-primary rounded-lg p-1.5">
              <Camera className="h-4 w-4 text-primary-foreground" />
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <div className="hidden sm:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search photos, people..." className="pl-9 bg-muted/50 border-0" />
            </div>
          </div>

          <div className="flex-1" />

          <ThemeToggle />
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarFallback className="gradient-primary text-primary-foreground text-xs font-bold">
              U
            </AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Mobile nav */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-14 z-40 bg-background/95 backdrop-blur-sm animate-fade-in">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.url;
              return (
                <Link
                  key={item.url}
                  to={item.url}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "gradient-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}

"use client";

import { usePathname } from "next/navigation";
import Index from "./Index";
import { FloatingDock } from "@/components/ui/floating-dock";
import { Home, LogIn, UserPlus, User } from "lucide-react";

const dockItems = [
  { title: "Home", icon: <Home className="h-5 w-5" />, href: "/" },
  { title: "Login", icon: <LogIn className="h-5 w-5" />, href: "/login" },
  { title: "Register", icon: <UserPlus className="h-5 w-5" />, href: "/register" },
  { title: "Profile", icon: <User className="h-5 w-5" />, href: "/profile" },
];

export default function NavbarWrapper() {
  const pathname = usePathname();

  return (
    <>
      
      {pathname !== "/" && <Index />}


      {pathname === "/" && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <FloatingDock items={dockItems} />
        </div>
      )}
    </>
  );
}

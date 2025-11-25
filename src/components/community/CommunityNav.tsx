import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Gamepad2, MessageSquare, Users, Activity, Calendar, UserSearch, Home } from "lucide-react";

const communityLinks = [
  { href: "/community", label: "Home", icon: Home },
  { href: "/community/forums", label: "Forums", icon: MessageSquare },
  { href: "/community/groups", label: "Groups", icon: Users },
  { href: "/community/activity", label: "Activity", icon: Activity },
  { href: "/community/events", label: "Events", icon: Calendar },
  { href: "/community/friends", label: "Find Friends", icon: UserSearch },
];

export default function CommunityNav() {
  const router = useRouter();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Gamepad2 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">GameVerse</span>
          </Link>
          <div className="flex items-center gap-2 overflow-x-auto">
            {communityLinks.map((link) => {
              const Icon = link.icon;
              const isActive = router.pathname === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className="gap-2 whitespace-nowrap"
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}


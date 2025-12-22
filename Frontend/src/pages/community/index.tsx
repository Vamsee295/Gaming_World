import React from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Activity, Calendar, UserSearch, ArrowRight } from "lucide-react";
import CommunityNav from "@/components/community/CommunityNav";
import SpotlightCard from "@/components/SpotlightCard";

const communityFeatures = [
  {
    title: "Forums & Discussions",
    description: "Join discussions, ask questions, share tips, and connect with fellow gamers",
    icon: MessageSquare,
    href: "/community/forums",
    color: "text-blue-500"
  },
  {
    title: "Groups & Communities",
    description: "Create or join groups around your favorite games, interests, or tournaments",
    icon: Users,
    href: "/community/groups",
    color: "text-green-500"
  },
  {
    title: "Activity Feed",
    description: "See what your friends and community are up to - achievements, reviews, and more",
    icon: Activity,
    href: "/community/activity",
    color: "text-purple-500"
  },
  {
    title: "Events & Tournaments",
    description: "Discover upcoming tournaments, sales events, streams, and community gatherings",
    icon: Calendar,
    href: "/community/events",
    color: "text-orange-500"
  },
  {
    title: "Find Friends",
    description: "Search for players by interests, games, achievements, and connect with them",
    icon: UserSearch,
    href: "/community/friends",
    color: "text-pink-500"
  }
];

export default function CommunityPage() {
  return (
    <>
      <Head>
        <title>Community - GameVerse</title>
        <meta name="description" content="Join the GameVerse community - forums, groups, events, and more" />
      </Head>

      <div className="min-h-screen bg-background">
        <CommunityNav />
        {/* Hero Section */}
        <section className="border-b border-border bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-5xl font-bold mb-4 text-foreground">Welcome to GameVerse Community</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Connect with gamers, share experiences, join discussions, and be part of an amazing gaming community
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <Link href={feature.href}>
                    <SpotlightCard>
                      <Card className="h-full hover:border-primary transition-all duration-300 cursor-pointer">
                        <CardHeader>
                          <div className="flex items-center gap-4 mb-2">
                            <div className={`p-3 rounded-lg bg-primary/10 ${feature.color}`}>
                              <Icon className="h-6 w-6" />
                            </div>
                            <CardTitle className="text-xl">{feature.title}</CardTitle>
                          </div>
                          <CardDescription>{feature.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button variant="ghost" className="w-full justify-between group">
                            Explore
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </CardContent>
                      </Card>
                    </SpotlightCard>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">1,234</div>
                <div className="text-sm text-muted-foreground">Active Members</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">567</div>
                <div className="text-sm text-muted-foreground">Forum Posts</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">89</div>
                <div className="text-sm text-muted-foreground">Active Groups</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">12</div>
                <div className="text-sm text-muted-foreground">Upcoming Events</div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
}


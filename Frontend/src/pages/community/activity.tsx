import React, { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Trophy, Star, ShoppingCart, Users, MessageSquare, Filter } from "lucide-react";
import { useCommunity } from "@/context/CommunityContext";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import CommunityNav from "@/components/community/CommunityNav";

const activityIcons = {
  achievement: Trophy,
  review: Star,
  purchase: ShoppingCart,
  group_join: Users,
  forum_post: MessageSquare,
};

export default function ActivityFeedPage() {
  const { activities } = useCommunity();
  const { user } = useUser();
  const [filter, setFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredActivities = activities.filter(activity => {
    const matchesFilter = filter === "all" || 
      (filter === "friends" && user?.id) ||
      (filter === "global" && true);
    const matchesType = typeFilter === "all" || activity.type === typeFilter;
    return matchesFilter && matchesType;
  });

  return (
    <>
      <Head>
        <title>Activity Feed - GameVerse Community</title>
      </Head>

      <div className="min-h-screen bg-background">
        <CommunityNav />
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Activity Feed</h1>
            <p className="text-muted-foreground">See what's happening in the GameVerse community</p>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-6 flex-wrap">
            <Tabs value={filter} onValueChange={setFilter} className="w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="friends">Friends</TabsTrigger>
                <TabsTrigger value="global">Global</TabsTrigger>
              </TabsList>
            </Tabs>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Activity Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="achievement">Achievements</SelectItem>
                <SelectItem value="review">Reviews</SelectItem>
                <SelectItem value="purchase">Purchases</SelectItem>
                <SelectItem value="group_join">Group Joins</SelectItem>
                <SelectItem value="forum_post">Forum Posts</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Activity Feed */}
          <div className="space-y-4">
            {filteredActivities.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Activity className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No activities yet. Start engaging with the community!</p>
                </CardContent>
              </Card>
            ) : (
              filteredActivities.map((activity) => {
                const Icon = activityIcons[activity.type] || Activity;
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <Card className="hover:border-primary transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-full bg-primary/10">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {activity.userAvatar ? (
                                <img src={activity.userAvatar} alt={activity.userName} className="h-8 w-8 rounded-full" />
                              ) : (
                                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs">
                                  {activity.userName.charAt(0)}
                                </div>
                              )}
                              <span className="font-semibold">{activity.userName}</span>
                              <Badge variant="outline" className="text-xs">
                                {activity.type.replace("_", " ")}
                              </Badge>
                            </div>
                            <h3 className="font-semibold text-foreground mb-1">{activity.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                            {activity.gameTitle && (
                              <Link href={`/game/${activity.gameId}`}>
                                <Badge variant="secondary" className="cursor-pointer hover:bg-primary/20">
                                  {activity.gameTitle}
                                </Badge>
                              </Link>
                            )}
                            <div className="text-xs text-muted-foreground mt-3">
                              {new Date(activity.createdAt).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}


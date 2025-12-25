import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Users, Plus, Search, Lock, Globe, UserPlus, UserMinus, Crown } from "lucide-react";
import { useCommunity } from "@/context/CommunityContext";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import CommunityNav from "@/components/community/CommunityNav";
import { BackButton } from "@/components/ui/BackButton";

export default function GroupsPage() {
  const { groups, addGroup, joinGroup, leaveGroup } = useCommunity();
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [newGroup, setNewGroup] = useState({
    name: "",
    description: "",
    isPublic: true,
    gameTags: [] as string[],
  });

  const gameTags = ["RPG", "Action", "Racing", "Strategy", "FPS", "MMORPG", "Indie", "Multiplayer"];

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateGroup = () => {
    if (!user || !newGroup.name || !newGroup.description) return;
    addGroup({
      name: newGroup.name,
      description: newGroup.description,
      isPublic: newGroup.isPublic,
      gameTags: newGroup.gameTags,
    });
    setNewGroup({ name: "", description: "", isPublic: true, gameTags: [] });
    setIsCreateOpen(false);
  };

  const selectedGroupData = groups.find(g => g.id === selectedGroup);
  const isMember = selectedGroupData && user ? selectedGroupData.members.includes(user.id || "") : false;
  const isAdmin = selectedGroupData && user ? selectedGroupData.admins.includes(user.id || "") : false;

  return (
    <>
      <Head>
        <title>Groups - GameVerse Community</title>
      </Head>

      <div className="min-h-screen bg-background">
        <CommunityNav />

        {/* Back Button */}
        <div className="container mx-auto px-4 pt-4">
          <BackButton />
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Groups & Communities</h1>
              <p className="text-muted-foreground">Create or join groups around your favorite games and interests</p>
            </div>
            {user && (
              <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Create Group
              </Button>
            )}
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search groups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Groups Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.length === 0 ? (
              <div className="col-span-full">
                <Card>
                  <CardContent className="p-12 text-center">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">No groups found. Create the first one!</p>
                    {user && (
                      <Button onClick={() => setIsCreateOpen(true)}>Create Group</Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            ) : (
              filteredGroups.map((group) => (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full hover:border-primary transition-all cursor-pointer" onClick={() => setSelectedGroup(group.id)}>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-lg">{group.name}</CardTitle>
                        {group.isPublic ? (
                          <Globe className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <Lock className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <CardDescription className="line-clamp-2">{group.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {group.gameTags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          {group.memberCount} members
                        </div>
                        <Badge variant={group.isPublic ? "default" : "outline"}>
                          {group.isPublic ? "Public" : "Private"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Create Group Dialog */}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Group</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Group Name</Label>
                <Input
                  placeholder="Enter group name"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  placeholder="Describe your group..."
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Public Group</Label>
                <Switch
                  checked={newGroup.isPublic}
                  onCheckedChange={(checked) => setNewGroup({ ...newGroup, isPublic: checked })}
                />
              </div>
              <div>
                <Label>Game Tags</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {gameTags.map(tag => (
                    <Badge
                      key={tag}
                      variant={newGroup.gameTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => {
                        setNewGroup({
                          ...newGroup,
                          gameTags: newGroup.gameTags.includes(tag)
                            ? newGroup.gameTags.filter(t => t !== tag)
                            : [...newGroup.gameTags, tag]
                        });
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateGroup}>Create Group</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Group Detail Dialog */}
        <Dialog open={!!selectedGroup} onOpenChange={(open) => !open && setSelectedGroup(null)}>
          <DialogContent className="max-w-2xl">
            {selectedGroupData && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-2">
                    {selectedGroupData.isPublic ? (
                      <Globe className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    )}
                    <DialogTitle>{selectedGroupData.name}</DialogTitle>
                  </div>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-muted-foreground">{selectedGroupData.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedGroupData.gameTags.map(tag => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <span className="font-semibold">{selectedGroupData.memberCount} members</span>
                    </div>
                    {user && (
                      isMember ? (
                        <Button
                          variant="outline"
                          onClick={() => {
                            if (user.id) leaveGroup(selectedGroupData.id, user.id);
                            setSelectedGroup(null);
                          }}
                          className="gap-2"
                        >
                          <UserMinus className="h-4 w-4" />
                          Leave Group
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            if (user.id) joinGroup(selectedGroupData.id, user.id);
                            setSelectedGroup(null);
                          }}
                          className="gap-2"
                        >
                          <UserPlus className="h-4 w-4" />
                          Join Group
                        </Button>
                      )
                    )}
                  </div>
                  {isAdmin && (
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <Crown className="h-4 w-4" />
                      You are an admin of this group
                    </div>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}


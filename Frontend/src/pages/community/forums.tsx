import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Plus, ThumbsUp, Eye, Pin, Lock, Search, X } from "lucide-react";
import { useCommunity } from "@/context/CommunityContext";
import { useUser } from "@/context/UserContext";
import CommunityNav from "@/components/community/CommunityNav";
import { useToast } from "@/components/ui/use-toast";
// Date formatting helper
const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
  const years = Math.floor(days / 365);
  return `${years} year${years > 1 ? 's' : ''} ago`;
};

const categories = ["General", "Support", "Game Discussions", "Off-Topic", "Reviews", "Troubleshooting"];
const tags = ["RPG", "Action", "Multiplayer", "Single Player", "Help", "Guide"];

export default function ForumsPage() {
  const { posts, addPost, addReply, likePost, likeReply } = useCommunity();
  const { user } = useUser();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "General", tags: [] as string[] });
  const [newReply, setNewReply] = useState("");

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreatePost = () => {
    if (!user || !newPost.title || !newPost.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    addPost({
      title: newPost.title,
      content: newPost.content,
      author: user.name || "Anonymous",
      authorAvatar: user.avatarUrl,
      category: newPost.category,
      tags: newPost.tags,
    });
    setNewPost({ title: "", content: "", category: "General", tags: [] });
    setIsCreateOpen(false);
    toast({
      title: "Post created",
      description: "Your forum post has been published",
    });
  };

  const handleAddReply = (postId: string) => {
    if (!user || !newReply.trim()) {
      toast({
        title: "Error",
        description: "Please enter a reply",
        variant: "destructive",
      });
      return;
    }
    addReply(postId, {
      postId,
      content: newReply,
      author: user.name || "Anonymous",
      authorAvatar: user.avatarUrl,
    });
    setNewReply("");
    setSelectedPost(null);
    toast({
      title: "Reply posted",
      description: "Your reply has been added",
    });
  };

  const selectedPostData = posts.find(p => p.id === selectedPost);

  return (
    <>
      <Head>
        <title>Forums - GameVerse Community</title>
      </Head>

      <div className="min-h-screen bg-background">
        <CommunityNav />
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Forums & Discussions</h1>
              <p className="text-muted-foreground">Join discussions, ask questions, and share your gaming experiences</p>
            </div>
            {user && (
              <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                New Thread
              </Button>
            )}
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-6 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search threads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {filteredPosts.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">No threads found. Be the first to start a discussion!</p>
                  {user && (
                    <Button onClick={() => setIsCreateOpen(true)}>Create First Thread</Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -2 }}
                >
                  <Card className="hover:border-primary transition-all cursor-pointer" onClick={() => setSelectedPost(post.id)}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {post.isPinned && <Pin className="h-4 w-4 text-primary" />}
                            {post.isLocked && <Lock className="h-4 w-4 text-muted-foreground" />}
                            <CardTitle className="text-lg">{post.title}</CardTitle>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="secondary">{post.category}</Badge>
                            {post.tags.map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {post.views}
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              {post.replies.length}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-2 mb-4">{post.content}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {post.authorAvatar ? (
                            <img src={post.authorAvatar} alt={post.author} className="h-6 w-6 rounded-full" />
                          ) : (
                            <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-xs">
                              {post.author.charAt(0)}
                            </div>
                          )}
                          <span className="text-sm text-foreground">{post.author}</span>
                          <span className="text-xs text-muted-foreground">
                            {formatTimeAgo(post.createdAt)}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            likePost(post.id);
                          }}
                          className="gap-2"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          {post.likes}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Create Post Dialog */}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Thread</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Thread Title"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              />
              <Select value={newPost.category} onValueChange={(v) => setNewPost({ ...newPost, category: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Textarea
                placeholder="Thread Content"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                rows={8}
              />
              <div>
                <label className="text-sm font-medium mb-2 block">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <Badge
                      key={tag}
                      variant={newPost.tags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => {
                        setNewPost({
                          ...newPost,
                          tags: newPost.tags.includes(tag)
                            ? newPost.tags.filter(t => t !== tag)
                            : [...newPost.tags, tag]
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
              <Button onClick={handleCreatePost}>Create Thread</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Post Detail Dialog */}
        <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            {selectedPostData && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-2">
                    {selectedPostData.isPinned && <Pin className="h-4 w-4 text-primary" />}
                    <DialogTitle>{selectedPostData.title}</DialogTitle>
                  </div>
                </DialogHeader>
                <div className="space-y-6">
                  {/* Original Post */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {selectedPostData.authorAvatar ? (
                            <img src={selectedPostData.authorAvatar} alt={selectedPostData.author} className="h-10 w-10 rounded-full" />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                              {selectedPostData.author.charAt(0)}
                            </div>
                          )}
                          <div>
                            <div className="font-semibold">{selectedPostData.author}</div>
                            <div className="text-sm text-muted-foreground">
                              {formatTimeAgo(selectedPostData.createdAt)}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => likePost(selectedPostData.id)}
                          className="gap-2"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          {selectedPostData.likes}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2 mb-4">
                        <Badge variant="secondary">{selectedPostData.category}</Badge>
                        {selectedPostData.tags.map(tag => (
                          <Badge key={tag} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                      <p className="whitespace-pre-wrap">{selectedPostData.content}</p>
                    </CardContent>
                  </Card>

                  {/* Replies */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Replies ({selectedPostData.replies.length})</h3>
                    <div className="space-y-4">
                      {selectedPostData.replies.map((reply) => (
                        <Card key={reply.id}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-center gap-3 flex-1">
                                {reply.authorAvatar ? (
                                  <img src={reply.authorAvatar} alt={reply.author} className="h-8 w-8 rounded-full" />
                                ) : (
                                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs">
                                    {reply.author.charAt(0)}
                                  </div>
                                )}
                                <div className="flex-1">
                                  <div className="font-semibold">{reply.author}</div>
                                  <p className="text-sm text-muted-foreground mt-1">{reply.content}</p>
                                  <div className="text-xs text-muted-foreground mt-2">
                                    {formatTimeAgo(reply.createdAt)}
                                  </div>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => likeReply(selectedPostData.id, reply.id)}
                                className="gap-2"
                              >
                                <ThumbsUp className="h-4 w-4" />
                                {reply.likes}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Reply Form */}
                  {user && (
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Write a reply..."
                        value={newReply}
                        onChange={(e) => setNewReply(e.target.value)}
                        rows={4}
                      />
                      <Button onClick={() => handleAddReply(selectedPostData.id)} className="w-full">
                        Post Reply
                      </Button>
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


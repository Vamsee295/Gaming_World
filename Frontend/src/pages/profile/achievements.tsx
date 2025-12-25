import React, { useState } from "react";
import Head from "next/head";
import { BackButton } from "@/components/ui/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, TrendingUp, Target } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PlayerData {
  rank: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  overallCompletion: number;
  totalAchievementsUnlocked: number;
}

interface CareerMilestone {
  name: string;
  value: string;
  icon: string;
}

interface GameProgress {
  title: string;
  progress: number;
  achievements: number;
  total: number;
  icon: string;
}

interface UnlockedBadge {
  name: string;
  desc: string;
  date: string;
  icon: string;
}

// Mock data structure for the dashboard
const mockData = {
  player: {
    rank: "Legendary Streamer",
    level: 84,
    xp: 145200,
    nextLevelXp: 180000,
    overallCompletion: 68.5,
    totalAchievementsUnlocked: 487,
  },
  careerMilestones: [
    { name: "Total Gameplay Hours", value: "8,941", icon: "🕒" },
    { name: "Games Completed (100%)", value: "27", icon: "✅" },
    { name: "Total Missions Completed", value: "1,124", icon: "🗺️" },
    { name: "Legacy Tag", value: "The Architect", icon: "🏷️" },
  ],
  gameProgress: [
    { title: "Cyberpunk 2077", progress: 72, achievements: 34, total: 48, icon: "💻" },
    { title: "Spiderman", progress: 45, achievements: 14, total: 30, icon: "🕸️" },
    { title: "GTA 6", progress: 20, achievements: 12, total: 60, icon: "🚗" },
  ],
  unlockedBadges: [
    { name: "First Broadcast", desc: "Completed 1st successful stream.", date: "2023-01-15", icon: "⭐" },
    { name: "The Grinder", desc: "Logged over 5,000 total hours.", date: "2024-03-22", icon: "⚙️" },
    { name: "Perfectionist", desc: "Completed 25+ games to 100%.", date: "2024-10-01", icon: "🏆" },
    { name: "Narrative Master", desc: "Finished 500+ story missions.", date: "2024-11-05", icon: "📖" },
    { name: "Community King", desc: "Reached 10,000 unique viewers.", date: "2025-01-20", icon: "👑" },
    { name: "The Architect", desc: "Built a fully functional base in 5 survival games.", date: "2025-05-18", icon: "🛠️" },
  ],
};

export default function AchievementsPage() {
  const { player, careerMilestones, gameProgress, unlockedBadges } = mockData;
  const xpProgress = Math.min((player.xp / player.nextLevelXp) * 100, 100);

  // State for filters and sorting
  const [filterGame, setFilterGame] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("progress");

  // Calculate next milestone
  const xpToNextLevel = player.nextLevelXp - player.xp;
  const achievementsToNext100 = Math.ceil((100 - player.overallCompletion) / 100 * 10); // Mock calculation

  // Filter and sort game progress
  const filteredGames = gameProgress.filter(game =>
    filterGame === "all" || game.title.toLowerCase().includes(filterGame.toLowerCase())
  );

  const sortedGames = [...filteredGames].sort((a, b) => {
    if (sortBy === "progress") return b.progress - a.progress;
    if (sortBy === "name") return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <>
      <Head>
        <title>My Achievements</title>
      </Head>
      <div className="min-h-screen p-4 md:p-8 bg-background">
        <div className="max-w-7xl mx-auto">
          {/* Navigation Button */}
          <div className="mb-6">
            <BackButton />
          </div>

          {/* Header Styling (Clean and Professional) */}
          <header className="mb-10 p-0">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 text-foreground">
              My Achievements
            </h1>
            <p className="text-xl mt-3 text-muted-foreground">
              A formal overview of your gaming performance and career milestones.
            </p>
          </header>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* COLUMN 1: Overall Summary & Player Level */}
            <div className="lg:col-span-1 space-y-6">
              {/* Overall Achievement Summary */}
              <Card className="hover:border-primary transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-bold border-b border-border pb-2">
                    Overall Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-secondary">
                    <span className="font-medium text-muted-foreground">
                      Total Achievements Unlocked:
                    </span>
                    <span className="text-xl font-bold text-foreground">
                      {player.totalAchievementsUnlocked}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-muted-foreground">
                        Overall Completion:
                      </span>
                      <span className="text-xl font-bold text-emerald-400">
                        {player.overallCompletion}%
                      </span>
                    </div>
                    {/* Overall Progress Bar */}
                    <Progress value={player.overallCompletion} className="h-2.5" />
                  </div>
                </CardContent>
              </Card>

              {/* Player Level / Rank Indicator */}
              <Card className="hover:border-primary transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-bold border-b border-border pb-2">
                    Player Rank
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="relative w-28 h-28 mx-auto mb-4">
                    {/* Outer ring for level */}
                    <div className="absolute inset-0 rounded-full border-4 border-border border-t-primary">
                      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl font-extrabold text-primary">
                        {player.level}
                      </span>
                    </div>
                  </div>

                  <p className="text-xl font-bold mb-1 text-foreground">{player.rank}</p>
                  <p className="text-sm text-muted-foreground">Level {player.level}</p>

                  {/* XP Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">XP Progress</span>
                      <span className="font-bold text-foreground">
                        {player.xp.toLocaleString()} / {player.nextLevelXp.toLocaleString()} XP
                      </span>
                    </div>
                    <Progress value={xpProgress} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Career Milestones Section */}
              <Card className="hover:border-primary transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-bold border-b border-border pb-2">
                    Career Milestones
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {careerMilestones.map((milestone, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 rounded-lg bg-secondary"
                    >
                      <div className="flex items-center">
                        <span className="mr-3 text-lg">{milestone.icon}</span>
                        <span className="text-muted-foreground">{milestone.name}:</span>
                      </div>
                      <span className="text-lg font-bold text-foreground">{milestone.value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Next Milestone Card - Phase 1 Enhancement */}
              <Card className="hover:border-primary transition-all duration-300 bg-gradient-to-br from-primary/5 to-transparent">
                <CardHeader>
                  <CardTitle className="text-xl font-bold border-b border-border pb-2 flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Next Milestone
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 rounded-lg bg-secondary">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Level {player.level + 1}</span>
                      <span className="text-sm font-bold text-primary">{xpToNextLevel.toLocaleString()} XP needed</span>
                    </div>
                    <Progress value={xpProgress} className="h-2" />
                  </div>
                  <div className="p-3 rounded-lg bg-secondary">
                    <p className="text-xs text-muted-foreground mb-1">Upcoming Achievement</p>
                    <p className="font-semibold text-foreground">🏅 Master Collector</p>
                    <p className="text-xs text-muted-foreground mt-1">Unlock {achievementsToNext100} more achievements</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* COLUMN 2 & 3: Game Progress and Badges */}
            <div className="lg:col-span-2 space-y-6">
              {/* Game-wise Achievement Progress Bars */}
              <Card className="hover:border-primary transition-all duration-300">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <CardTitle className="text-xl font-bold border-b border-border pb-2">
                      Game Completion Progress
                    </CardTitle>
                    {/* Filter and Sort Controls - Phase 1 Enhancement */}
                    <div className="flex gap-2 items-center">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-muted-foreground" />
                        <Select value={filterGame} onValueChange={setFilterGame}>
                          <SelectTrigger className="w-[160px]">
                            <SelectValue placeholder="Filter Game" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Games</SelectItem>
                            <SelectItem value="cyberpunk">Cyberpunk 2077</SelectItem>
                            <SelectItem value="spiderman">Spiderman</SelectItem>
                            <SelectItem value="gta">GTA 6</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        <Select value={sortBy} onValueChange={setSortBy}>
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Sort By" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="progress">By Progress</SelectItem>
                            <SelectItem value="name">By Name</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {sortedGames.map((game, index) => (
                    <Card key={index} className="bg-secondary border-border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold flex items-center text-foreground">
                            <span className="text-xl mr-3">{game.icon}</span>
                            {game.title}
                          </h3>
                          {/* Percentage completion badge */}
                          <Badge className="text-base font-bold bg-primary text-primary-foreground px-3 py-0.5">
                            {game.progress}%
                          </Badge>
                        </div>
                        {/* Progress Bar */}
                        <Progress value={game.progress} className="h-2 mb-1" />
                        {/* Achievement count and badge indicator */}
                        <div className="flex justify-between items-center text-xs pt-1 text-muted-foreground">
                          <p>
                            Unlocked Badges: <span className="text-yellow-500 font-bold">●</span>
                          </p>
                          <p className="text-right">
                            Achievements: {game.achievements} / {game.total}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>

              {/* Unlocked Badges / Trophies Display */}
              <Card className="hover:border-primary transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-bold border-b border-border pb-2 mb-6">
                    Unlocked Badges / Trophies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TooltipProvider>
                    <div className="flex flex-wrap gap-6 justify-center">
                      {unlockedBadges.map((badge, index) => (
                        <Tooltip key={index}>
                          <TooltipTrigger asChild>
                            <div className="w-24 h-24 flex flex-col items-center justify-center p-3 rounded-xl border-2 border-border bg-secondary hover:border-primary hover:scale-105 transition-all duration-200 cursor-pointer">
                              <span className="text-4xl mb-1">{badge.icon}</span>
                              <p className="text-xs font-semibold text-center text-foreground">
                                {badge.name}
                              </p>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            className="max-w-xs bg-popover text-popover-foreground border border-border"
                          >
                            <div className="space-y-1">
                              <p className="font-bold text-sm text-primary">{badge.name}</p>
                              <p className="text-xs text-muted-foreground">{badge.desc}</p>
                              <p className="text-xs mt-1 text-primary">Unlocked: {badge.date}</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </TooltipProvider>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

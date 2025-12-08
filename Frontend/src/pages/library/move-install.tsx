import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, FolderOpen, HardDrive, CheckCircle2, AlertCircle } from "lucide-react";

export default function MoveInstallPage() {
    const router = useRouter();
    const { gameId, gameName, currentPath = "C:\\Games\\Cyberpunk 2077", size = "70" } = router.query;

    const [newPath, setNewPath] = useState("");
    const [moving, setMoving] = useState(false);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState<"idle" | "validating" | "moving" | "complete" | "error">("idle");
    const [freeSpace] = useState(150); // GB

    const selectFolder = () => {
        // In a real app, this would open a native folder picker
        const mockPath = "D:\\SteamLibrary\\steamapps\\common\\Cyberpunk 2077";
        setNewPath(mockPath);
    };

    const startMove = () => {
        if (!newPath) {
            alert("Please select a destination folder first");
            return;
        }

        const gameSize = parseFloat(size as string);
        if (freeSpace < gameSize) {
            alert(`Insufficient space! Need ${gameSize} GB but only ${freeSpace} GB available.`);
            return;
        }

        setMoving(true);
        setStatus("moving");
        setProgress(0);

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setMoving(false);
                    setStatus("complete");
                    return 100;
                }
                return prev + 1;
            });
        }, 150);
    };

    return (
        <>
            <Head>
                <title>Move Install Folder - {gameName || "Game"}</title>
            </Head>

            <div className="min-h-screen bg-background">
                <div className="border-b border-border bg-secondary/50">
                    <div className="container mx-auto px-4 py-4">
                        <Link href="/library">
                            <Button variant="ghost" size="sm" className="gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                Back to Library
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8 max-w-3xl">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-foreground mb-2">Move Install Folder</h1>
                        <p className="text-muted-foreground">{gameName || "Game"} - Relocate game files to a different drive</p>
                    </div>

                    {status === "complete" ? (
                        <Card>
                            <CardContent className="p-12 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-4">
                                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-2">Move Complete!</h3>
                                <p className="text-muted-foreground mb-6">
                                    {gameName} has been successfully moved to:<br />
                                    <span className="font-mono text-sm">{newPath}</span>
                                </p>
                                <Link href="/library">
                                    <Button>Return to Library</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Current Location</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                                        <FolderOpen className="h-5 w-5 text-muted-foreground" />
                                        <span className="font-mono text-sm">{currentPath}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        <div>
                                            <div className="text-sm text-muted-foreground">Install Size</div>
                                            <div className="text-2xl font-bold">{size} GB</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted-foreground">Free Space on Target</div>
                                            <div className="text-2xl font-bold text-green-500">{freeSpace} GB</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>New Location</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex gap-3">
                                        <Input
                                            placeholder="Select destination folder..."
                                            value={newPath}
                                            readOnly
                                            className="font-mono text-sm"
                                        />
                                        <Button onClick={selectFolder} variant="outline" className="gap-2">
                                            <FolderOpen className="h-4 w-4" />
                                            Browse
                                        </Button>
                                    </div>

                                    {newPath && (
                                        <div className="flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                            <HardDrive className="h-5 w-5 text-blue-500 mt-0.5" />
                                            <div className="flex-1 text-sm">
                                                <p className="font-medium text-foreground">Destination Ready</p>
                                                <p className="text-muted-foreground">
                                                    {freeSpace} GB available (requires {size} GB)
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {moving && (
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span>Moving files...</span>
                                                <span>{progress}%</span>
                                            </div>
                                            <Progress value={progress} className="h-2" />
                                            <p className="text-xs text-muted-foreground">
                                                ETA: {Math.ceil((100 - progress) / 2)} minutes remaining
                                            </p>
                                        </div>
                                    )}

                                    <div className="flex gap-3">
                                        <Button onClick={startMove} disabled={!newPath || moving} className="flex-1">
                                            {moving ? "Moving..." : "Start Move"}
                                        </Button>
                                        <Link href="/library">
                                            <Button variant="outline" disabled={moving}>Cancel</Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Important Notes</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground space-y-2">
                                    <p className="flex items-start gap-2">
                                        <AlertCircle className="h-4 w-4 mt-0.5 text-orange-500" />
                                        Make sure the game is closed before moving files
                                    </p>
                                    <p className="flex items-start gap-2">
                                        <AlertCircle className="h-4 w-4 mt-0.5 text-orange-500" />
                                        Do not cancel or shut down during the move operation
                                    </p>
                                    <p className="flex items-start gap-2">
                                        <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500" />
                                        Your saves and progress will be preserved
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

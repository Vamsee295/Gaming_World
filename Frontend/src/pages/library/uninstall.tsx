import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Trash, AlertTriangle, CheckCircle2, HardDrive } from "lucide-react";

export default function UninstallPage() {
    const router = useRouter();
    const { gameId, gameName, size = "70" } = router.query;

    const [confirmed, setConfirmed] = useState(false);
    const [keepCloudSaves, setKeepCloudSaves] = useState(true);
    const [uninstalling, setUninstalling] = useState(false);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState<"confirming" | "uninstalling" | "complete">("confirming");

    const startUninstall = () => {
        if (!confirmed) {
            alert("Please confirm that you understand the consequences of uninstalling.");
            return;
        }

        setUninstalling(true);
        setStatus("uninstalling");
        setProgress(0);

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setUninstalling(false);
                    setStatus("complete");
                    return 100;
                }
                return prev + 2;
            });
        }, 100);
    };

    if (status === "complete") {
        return (
            <>
                <Head>
                    <title>Uninstall Complete</title>
                </Head>
                <div className="min-h-screen bg-background flex items-center justify-center p-4">
                    <Card className="max-w-md w-full">
                        <CardContent className="p-12 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-4">
                                <CheckCircle2 className="h-8 w-8 text-green-500" />
                            </div>
                            <h2 className="text-2xl font-bold textforeground mb-2">Uninstall Complete</h2>
                            <p className="text-muted-foreground mb-2">
                                {gameName} has been successfully uninstalled
                            </p>
                            <p className="text-sm text-muted-foreground mb-6">
                                {size} GB of disk space has been freed
                            </p>
                            {keepCloudSaves && (
                                <p className="text-sm text-green-500 mb-6">
                                    ✓ Your cloud saves have been preserved
                                </p>
                            )}
                            <div className="flex gap-3 justify-center">
                                <Link href="/library">
                                    <Button>Return to Library</Button>
                                </Link>
                                <Link href={`/install?gameId=${gameId}`}>
                                    <Button variant="outline">Reinstall</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>Uninstall {gameName || "Game"}</title>
            </Head>

            <div className="min-h-screen bg-background">
                <div className="border-b border-border bg-secondary/50">
                    <div className="container mx-auto px-4 py-4">
                        <Link href="/library">
                            <Button variant="ghost" size="sm" className="gap-2" disabled={uninstalling}>
                                <ArrowLeft className="h-4 w-4" />
                                Back to Library
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8 max-w-2xl">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
                            <Trash className="h-8 w-8 text-destructive" />
                            Uninstall Game
                        </h1>
                        <p className="text-muted-foreground">{gameName || "Game"}</p>
                    </div>

                    <Alert variant="destructive" className="mb-6">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                            Warning: This action will permanently remove all game files from your device. Your game will remain in your library for reinstallation.
                        </AlertDescription>
                    </Alert>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Uninstall Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <HardDrive className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">Disk Space to Free</p>
                                            <p className="text-sm text-muted-foreground">Installation size</p>
                                        </div>
                                    </div>
                                    <div className="text-2xl font-bold text-green-500">{size} GB</div>
                                </div>

                                <div className="space-y-3 pt-4">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="keep-saves"
                                            checked={keepCloudSaves}
                                            onCheckedChange={(checked) => setKeepCloudSaves(checked as boolean)}
                                        />
                                        <label
                                            htmlFor="keep-saves"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Keep my cloud saves (recommended)
                                        </label>
                                    </div>
                                    <p className="text-xs text-muted-foreground ml-6">
                                        Your save files will be preserved in the cloud and restored if you reinstall
                                    </p>
                                </div>

                                <div className="flex items-start space-x-2 pt-4">
                                    <Checkbox
                                        id="confirm"
                                        checked={confirmed}
                                        onCheckedChange={(checked) => setConfirmed(checked as boolean)}
                                    />
                                    <label
                                        htmlFor="confirm"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        I understand that this will remove all game files from my device
                                    </label>
                                </div>

                                {uninstalling && (
                                    <div className="space-y-2 pt-4">
                                        <div className="flex justify-between text-sm">
                                            <span>Uninstalling...</span>
                                            <span>{progress}%</span>
                                        </div>
                                        <Progress value={progress} className="h-2" />
                                        <p className="text-xs text-muted-foreground">
                                            Removing files and cleaning up...
                                        </p>
                                    </div>
                                )}

                                <div className="flex gap-3 pt-4">
                                    <Button
                                        onClick={startUninstall}
                                        disabled={!confirmed || uninstalling}
                                        variant="destructive"
                                        className="flex-1 gap-2"
                                    >
                                        <Trash className="h-4 w-4" />
                                        {uninstalling ? "Uninstalling..." : "Uninstall Game"}
                                    </Button>
                                    <Link href="/library">
                                        <Button variant="outline" disabled={uninstalling}>Cancel</Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">What happens when you uninstall?</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground space-y-2">
                                <p>• All game files will be permanently deleted from your device</p>
                                <p>• The game will remain in your library for future reinstallation</p>
                                <p>• Cloud saves will be preserved (if selected above)</p>
                                <p>• DLC and add-ons will also be uninstalled</p>
                                <p>• You can reinstall the game at any time</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

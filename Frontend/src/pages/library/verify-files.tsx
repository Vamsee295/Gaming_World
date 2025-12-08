import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ArrowLeft, CheckCircle2, XCircle, AlertCircle, Download, RefreshCw } from "lucide-react";

export default function VerifyFilesPage() {
    const router = useRouter();
    const { gameId, gameName } = router.query;

    const [verifying, setVerifying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState<"idle" | "verifying" | "complete" | "error">("idle");
    const [repairDialog, setRepairDialog] = useState(false);
    const [repairing, setRepairing] = useState(false);
    const [repairProgress, setRepairProgress] = useState(0);
    const [results, setResults] = useState<{
        totalFiles: number;
        verified: number;
        missing: number;
        corrupt: number;
        missingFiles: string[];
        corruptFiles: string[];
    }>({
        totalFiles: 0,
        verified: 0,
        missing: 0,
        corrupt: 0,
        missingFiles: [],
        corruptFiles: []
    });

    const startVerification = () => {
        setVerifying(true);
        setStatus("verifying");
        setProgress(0);

        // Simulate file verification
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setVerifying(false);
                    setStatus("complete");
                    // Simulate results
                    setResults({
                        totalFiles: 1247,
                        verified: 1243,
                        missing: 2,
                        corrupt: 2,
                        missingFiles: ["GameData/Textures/skybox_night.dds", "Audio/Music/combat_theme.wav"],
                        corruptFiles: ["GameData/Models/character_model_01.mesh", "Binaries/Game.exe.config"]
                    });
                    return 100;
                }
                return prev + 2;
            });
        }, 100);
    };

    const openRepairDialog = () => {
        setRepairDialog(true);
    };

    const startRepair = () => {
        setRepairing(true);
        setRepairProgress(0);

        const interval = setInterval(() => {
            setRepairProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setRepairing(false);
                    setRepairDialog(false);
                    // Reset to show all files verified after repair
                    setResults({
                        ...results,
                        verified: results.totalFiles,
                        missing: 0,
                        corrupt: 0,
                        missingFiles: [],
                        corruptFiles: []
                    });
                    return 100;
                }
                return prev + 1;
            });
        }, 100);
    };

    return (
        <>
            <Head>
                <title>Verify Game Files - {gameName || "Game"}</title>
            </Head>

            <div className="min-h-screen bg-background">
                {/* Header */}
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

                {/* Main Content */}
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-foreground mb-2">Verify Game Files</h1>
                        <p className="text-muted-foreground">
                            {gameName || "Game"} - Check file integrity and repair if needed
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                {status === "idle" && <RefreshCw className="h-5 w-5" />}
                                {status === "verifying" && <RefreshCw className="h-5 w-5 animate-spin" />}
                                {status === "complete" && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                                {status === "error" && <XCircle className="h-5 w-5 text-destructive" />}
                                Verification Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {status === "idle" && (
                                <div className="text-center py-8">
                                    <p className="text-muted-foreground mb-6">
                                        This will check all game files against the server manifest and detect any missing or corrupted files.
                                    </p>
                                    <Button onClick={startVerification} size="lg" className="gap-2">
                                        <RefreshCw className="h-5 w-5" />
                                        Start Verification
                                    </Button>
                                </div>
                            )}

                            {status === "verifying" && (
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm font-medium">Verifying files...</span>
                                            <span className="text-sm text-muted-foreground">{progress}%</span>
                                        </div>
                                        <Progress value={progress} className="h-2" />
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Checking file integrity and comparing checksums...
                                    </p>
                                </div>
                            )}

                            {status === "complete" && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <Card>
                                            <CardContent className="p-4">
                                                <div className="text-2xl font-bold text-foreground">{results.totalFiles}</div>
                                                <div className="text-xs text-muted-foreground">Total Files</div>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardContent className="p-4">
                                                <div className="text-2xl font-bold text-green-500">{results.verified}</div>
                                                <div className="text-xs text-muted-foreground">Verified</div>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardContent className="p-4">
                                                <div className="text-2xl font-bold text-orange-500">{results.missing}</div>
                                                <div className="text-xs text-muted-foreground">Missing</div>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardContent className="p-4">
                                                <div className="text-2xl font-bold text-red-500">{results.corrupt}</div>
                                                <div className="text-xs text-muted-foreground">Corrupt</div>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    {(results.missing > 0 || results.corrupt > 0) && (
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-2 p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                                                <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                                                <div className="flex-1">
                                                    <p className="font-medium text-foreground">Issues Found</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {results.missing + results.corrupt} file(s) need to be repaired
                                                    </p>
                                                </div>
                                            </div>

                                            {results.missingFiles.length > 0 && (
                                                <div>
                                                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                                                        <XCircle className="h-4 w-4 text-orange-500" />
                                                        Missing Files ({results.missing})
                                                    </h3>
                                                    <div className="space-y-1">
                                                        {results.missingFiles.map((file, idx) => (
                                                            <div key={idx} className="text-sm text-muted-foreground pl-6 py-1 border-l-2 border-orange-500">
                                                                {file}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {results.corruptFiles.length > 0 && (
                                                <div>
                                                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                                                        <AlertCircle className="h-4 w-4 text-red-500" />
                                                        Corrupt Files ({results.corrupt})
                                                    </h3>
                                                    <div className="space-y-1">
                                                        {results.corruptFiles.map((file, idx) => (
                                                            <div key={idx} className="text-sm text-muted-foreground pl-6 py-1 border-l-2 border-red-500">
                                                                {file}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex gap-3">
                                                <Button onClick={openRepairDialog} className="gap-2">
                                                    <Download className="h-4 w-4" />
                                                    Repair Files
                                                </Button>
                                                <Button onClick={() => setStatus("idle")} variant="outline">
                                                    Verify Again
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    {results.missing === 0 && results.corrupt === 0 && (
                                        <div className="text-center py-8">
                                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-4">
                                                <CheckCircle2 className="h-8 w-8 text-green-500" />
                                            </div>
                                            <h3 className="text-xl font-semibold text-foreground mb-2">All Files Verified!</h3>
                                            <p className="text-muted-foreground mb-6">
                                                No issues found. All {results.totalFiles} files are intact and verified.
                                            </p>
                                            <div className="flex gap-3 justify-center">
                                                <Link href="/library">
                                                    <Button variant="outline">Return to Library</Button>
                                                </Link>
                                                <Button onClick={() => setStatus("idle")} variant="ghost">
                                                    Verify Again
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle className="text-lg">About File Verification</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground space-y-2">
                            <p>
                                • Verification compares your local game files against the official server manifest
                            </p>
                            <p>
                                • Missing or corrupt files will be automatically downloaded during repair
                            </p>
                            <p>
                                • This process may take several minutes depending on game size
                            </p>
                            <p>
                                • Your game progress and saves will not be affected
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Repair Files Dialog */}
            <Dialog open={repairDialog} onOpenChange={setRepairDialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Repair Game Files</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="flex items-start gap-2 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                            <Download className="h-5 w-5 text-primary mt-0.5" />
                            <div className="flex-1">
                                <p className="font-medium text-foreground">Starting Repair</p>
                                <p className="text-sm text-muted-foreground">
                                    Downloading {results.missing + results.corrupt} file(s)
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Estimated size: 450 MB
                                </p>
                            </div>
                        </div>

                        {repairing && (
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Downloading and repairing...</span>
                                    <span>{repairProgress}%</span>
                                </div>
                                <Progress value={repairProgress} className="h-2" />
                                <p className="text-xs text-muted-foreground">
                                    ETA: {Math.ceil((100 - repairProgress) / 2)} seconds remaining
                                </p>
                            </div>
                        )}

                        <div className="text-sm text-muted-foreground space-y-1">
                            <p>• Missing files will be downloaded from the server</p>
                            <p>• Corrupt files will be replaced with verified copies</p>
                            <p>• Your saves and progress will not be affected</p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setRepairDialog(false)} disabled={repairing}>
                            Cancel
                        </Button>
                        <Button onClick={startRepair} disabled={repairing} className="gap-2">
                            <Download className="h-4 w-4" />
                            {repairing ? "Repairing..." : "Start Repair"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

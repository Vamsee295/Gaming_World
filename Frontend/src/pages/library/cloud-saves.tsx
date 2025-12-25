import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ArrowLeft, Cloud, Upload, Download, Trash, CheckCircle2, AlertCircle, FileText } from "lucide-react";

interface CloudSave {
    id: string;
    name: string;
    timestamp: string;
    size: string;
    isCurrent: boolean;
}

export default function CloudSavesPage() {
    const router = useRouter();
    const { gameId, gameName } = router.query;

    const [saves, setSaves] = useState<CloudSave[]>([
        { id: "1", name: "Auto Save - Chapter 12", timestamp: "2024-12-08 18:30", size: "4.2 MB", isCurrent: true },
        { id: "2", name: "Quick Save - Mission Complete", timestamp: "2024-12-07 14:15", size: "4.1 MB", isCurrent: false },
        { id: "3", name: "Manual Save - Before Boss", timestamp: "2024-12-06 20:45", size: "3.9 MB", isCurrent: false },
        { id: "4", name: "Auto Save - Chapter 11", timestamp: "2024-12-05 16:22", size: "3.8 MB", isCurrent: false }
    ]);

    const [deleteDialog, setDeleteDialog] = useState(false);
    const [selectedSave, setSelectedSave] = useState<CloudSave | null>(null);
    const [lastSync, setLastSync] = useState("2024-12-08 18:35");

    const handleUpload = () => {
        alert("Uploading current save to cloud...\n\nThis will create a new cloud backup of your current progress.");
    };

    const handleRestore = (save: CloudSave) => {
        if (confirm(`Restore save from ${save.timestamp}?\n\nThis will overwrite your current local save.\n\nA backup will be created first.`)) {
            alert(`Restoring "${save.name}"\n\nYour current save has been backed up.`);
        }
    };

    const handleDelete = (save: CloudSave) => {
        setSelectedSave(save);
        setDeleteDialog(true);
    };

    const confirmDelete = () => {
        if (selectedSave) {
            setSaves(saves.filter(s => s.id !== selectedSave.id));
            setDeleteDialog(false);
            setSelectedSave(null);
        }
    };

    return (
        <>
            <Head>
                <title>Cloud Saves - {gameName || "Game"}</title>
            </Head>

            <div className="min-h-screen bg-background">
                <div className="border-b border-border bg-secondary/50">
                    <div className="container mx-auto px-4 py-4">
                        <BackButton />
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-foreground mb-2">Cloud Saves</h1>
                        <p className="text-muted-foreground">{gameName || "Game"} - Manage your cloud-synced save files</p>
                    </div>

                    <div className="grid gap-6">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2">
                                        <Cloud className="h-5 w-5 text-green-500" />
                                        Sync Status
                                    </CardTitle>
                                    <Badge variant="outline" className="gap-1">
                                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                                        Synced
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Last Synced</p>
                                        <p className="font-medium">{lastSync}</p>
                                    </div>
                                    <Button onClick={handleUpload} className="gap-2">
                                        <Upload className="h-4 w-4" />
                                        Upload Current Save
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Cloud Save Files ({saves.length})</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {saves.map(save => (
                                        <div
                                            key={save.id}
                                            className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
                                        >
                                            <div className="flex items-start gap-3 flex-1">
                                                <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="font-medium">{save.name}</span>
                                                        {save.isCurrent && (
                                                            <Badge variant="secondary" className="text-xs">Current</Badge>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                        <span>{save.timestamp}</span>
                                                        <span>{save.size}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleRestore(save)}
                                                    disabled={save.isCurrent}
                                                    className="gap-1"
                                                >
                                                    <Download className="h-3 w-3" />
                                                    Restore
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleDelete(save)}
                                                    disabled={save.isCurrent}
                                                >
                                                    <Trash className="h-3 w-3 text-destructive" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">About Cloud Saves</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground space-y-2">
                                <p className="flex items-start gap-2">
                                    <Cloud className="h-4 w-4 mt-0.5 text-blue-500" />
                                    Saves are automatically backed up to the cloud when you exit the game
                                </p>
                                <p className="flex items-start gap-2">
                                    <AlertCircle className="h-4 w-4 mt-0.5 text-orange-500" />
                                    Restoring a save will create a backup of your current save first
                                </p>
                                <p className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500" />
                                    Cloud saves are encrypted and stored securely
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Cloud Save?</DialogTitle>
                    </DialogHeader>
                    <p className="text-muted-foreground">
                        Are you sure you want to delete "{selectedSave?.name}"?
                        <br /><br />
                        This action cannot be undone.
                    </p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialog(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={confirmDelete} className="gap-2">
                            <Trash className="h-4 w-4" />
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

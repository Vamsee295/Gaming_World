import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Play, Pause, Settings, X, HardDrive, Download, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/router';
import Head from 'next/head';

// Import game images with descriptive names
import cyberpunk2077 from "@/components/Images/Store Images/cyberpunk-2077.jpg";
import spiderman from "@/components/Images/Store Images/spiderman.jpg";
import gta6 from "@/components/Images/Store Images/gta-6.webp";
import needForSpeed from "@/components/Images/Store Images/need-for-speed.jpg";
import lastOfUs from "@/components/Images/Store Images/last-of-us.webp";
import detroit from "@/components/Images/Store Images/detroit-become-human.webp";
import aWayOut from "@/components/Images/Store Images/a-way-out.webp";
import blackMythWukong from "@/components/Images/Store Images/black-myth-wukong.webp";

// --- Types ---

interface GameMetadata {
    id: string;
    title: string;
    coverImage: any;
    heroImage: any;
    totalSize: number;
    diskReq: number;
    developer: string;
}

interface DownloadState {
    status: 'idle' | 'allocating' | 'downloading' | 'stopping' | 'completed';
    downloadedBytes: number;
    diskBytes: number;
    currentNetworkSpeed: number;
    currentDiskSpeed: number;
    peakNetworkSpeed: number;
    startTime: number | null;
}

interface GraphPoint {
    network: number;
    disk: number;
}

// --- Constants & Game Data ---

const GAME_DATA: { [key: string]: GameMetadata } = {
    '1': {
        id: '1',
        title: 'Cyberpunk 2077',
        coverImage: cyberpunk2077,
        heroImage: cyberpunk2077,
        totalSize: 7.3 * 1024 * 1024 * 1024,
        diskReq: 9.0 * 1024 * 1024 * 1024,
        developer: 'CD Projekt Red'
    },
    '2': {
        id: '2',
        title: "Marvel's Spiderman",
        coverImage: spiderman,
        heroImage: spiderman,
        totalSize: 6.8 * 1024 * 1024 * 1024,
        diskReq: 8.5 * 1024 * 1024 * 1024,
        developer: 'Insomniac Games'
    },
    '3': {
        id: '3',
        title: 'Grand Theft Auto 6',
        coverImage: gta6,
        heroImage: gta6,
        totalSize: 8.2 * 1024 * 1024 * 1024,
        diskReq: 10.0 * 1024 * 1024 * 1024,
        developer: 'Rockstar Games'
    },
    '4': {
        id: '4',
        title: 'Need For Speed',
        coverImage: needForSpeed,
        heroImage: needForSpeed,
        totalSize: 5.5 * 1024 * 1024 * 1024,
        diskReq: 7.0 * 1024 * 1024 * 1024,
        developer: 'Ghost Games'
    },
    '5': {
        id: '5',
        title: 'The Last Of Us',
        coverImage: lastOfUs,
        heroImage: lastOfUs,
        totalSize: 7.0 * 1024 * 1024 * 1024,
        diskReq: 8.8 * 1024 * 1024 * 1024,
        developer: 'Naughty Dog'
    },
    '6': {
        id: '6',
        title: 'Detroit: Become Human',
        coverImage: detroit,
        heroImage: detroit,
        totalSize: 6.3 * 1024 * 1024 * 1024,
        diskReq: 7.8 * 1024 * 1024 * 1024,
        developer: 'Quantic Dream'
    },
    '7': {
        id: '7',
        title: 'A Way Out',
        coverImage: aWayOut,
        heroImage: aWayOut,
        totalSize: 4.5 * 1024 * 1024 * 1024,
        diskReq: 5.8 * 1024 * 1024 * 1024,
        developer: 'Hazelight Studios'
    },
    '8': {
        id: '8',
        title: 'Black Myth Wukong',
        coverImage: blackMythWukong,
        heroImage: blackMythWukong,
        totalSize: 9.2 * 1024 * 1024 * 1024,
        diskReq: 11.5 * 1024 * 1024 * 1024,
        developer: 'Game Science'
    },
};

const TICK_RATE = 1000;
const MAX_GRAPH_POINTS = 60;

// --- Helper Functions ---

const formatBytes = (bytes: number, decimals = 1) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const formatSpeed = (bytesPerSec: number) => {
    if (bytesPerSec === 0) return '0 B/s';
    const bits = bytesPerSec * 8;
    const mbps = bits / 1_000_000;
    return `${mbps.toFixed(1)} Mbps`;
};

const formatDuration = (seconds: number) => {
    if (!seconds || !isFinite(seconds)) return '--:--';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    if (h > 0) return `${h}h ${m}m remaining`;
    return `${m}m ${s}s remaining`;
};

// --- Main Component ---

export default function InstallPage() {
    const router = useRouter();
    const { gameId } = router.query;

    const CURRENT_GAME = GAME_DATA[gameId as string] || GAME_DATA['1'];

    const [downloadState, setDownloadState] = useState<DownloadState>({
        status: 'idle',
        downloadedBytes: 0,
        diskBytes: 0,
        currentNetworkSpeed: 0,
        currentDiskSpeed: 0,
        peakNetworkSpeed: 0,
        startTime: null,
    });

    const [graphData, setGraphData] = useState<GraphPoint[]>(new Array(MAX_GRAPH_POINTS).fill({ network: 0, disk: 0 }));
    const [showInstallModal, setShowInstallModal] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (downloadState.status === 'downloading') {
            interval = setInterval(() => {
                setDownloadState(prev => {
                    const baseSpeed = 6.25 * 1024 * 1024;
                    const variance = (Math.random() - 0.5) * (baseSpeed * 0.4);
                    const newNetworkSpeed = Math.max(0, baseSpeed + variance);

                    const isDiskBurst = Math.random() > 0.6;
                    const newDiskSpeed = isDiskBurst ? newNetworkSpeed * 1.5 : newNetworkSpeed * 0.8;

                    const newDownloaded = Math.min(prev.downloadedBytes + newNetworkSpeed, CURRENT_GAME.totalSize);
                    const newDiskBytes = Math.min(prev.diskBytes + newDiskSpeed, CURRENT_GAME.totalSize);

                    const newPeak = Math.max(prev.peakNetworkSpeed, newNetworkSpeed);

                    let newStatus = prev.status;
                    if (newDownloaded >= CURRENT_GAME.totalSize) {
                        newStatus = 'completed';
                    }

                    setGraphData(currGraph => {
                        const newGraph = [...currGraph.slice(1), { network: newNetworkSpeed, disk: newDiskSpeed }];
                        return newGraph;
                    });

                    return {
                        ...prev,
                        status: newStatus,
                        downloadedBytes: newDownloaded,
                        diskBytes: newDiskBytes,
                        currentNetworkSpeed: newStatus === 'completed' ? 0 : newNetworkSpeed,
                        currentDiskSpeed: newStatus === 'completed' ? 0 : newDiskSpeed,
                        peakNetworkSpeed: newPeak,
                    };
                });
            }, TICK_RATE);
        } else {
            if (downloadState.status !== 'completed' && downloadState.status !== 'downloading') {
                setDownloadState(prev => ({ ...prev, currentNetworkSpeed: 0, currentDiskSpeed: 0 }));
            }
        }

        return () => clearInterval(interval);
    }, [downloadState.status, CURRENT_GAME.totalSize]);

    const handleStartDownload = () => {
        setDownloadState(prev => ({ ...prev, status: 'allocating' }));
        setTimeout(() => {
            setDownloadState(prev => ({ ...prev, status: 'downloading', startTime: Date.now() }));
        }, 1500);
    };

    const handlePause = () => {
        setDownloadState(prev => ({ ...prev, status: 'stopping' }));
        setTimeout(() => {
            setDownloadState(prev => ({ ...prev, status: 'idle' }));
        }, 500);
    };

    const percentDownloaded = (downloadState.downloadedBytes / CURRENT_GAME.totalSize) * 100;
    const percentDisk = (downloadState.diskBytes / CURRENT_GAME.totalSize) * 100;

    const remainingBytes = CURRENT_GAME.totalSize - downloadState.downloadedBytes;
    const timeRemainingSeconds = downloadState.currentNetworkSpeed > 0
        ? remainingBytes / downloadState.currentNetworkSpeed
        : 0;

    const renderGraph = () => {
        const height = 80;
        const width = 300;
        const maxVal = Math.max(
            ...graphData.map(p => Math.max(p.network, p.disk)),
            10 * 1024 * 1024
        );

        const getY = (val: number) => height - ((val / maxVal) * height);
        const stepX = width / MAX_GRAPH_POINTS;

        const diskPath = graphData.map((p, i) =>
            `${i === 0 ? 'M' : 'L'} ${i * stepX} ${getY(p.disk)}`
        ).join(' ');

        return (
            <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="overflow-visible">
                <line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke="#ffffff10" strokeWidth="1" />

                {graphData.map((p, i) => (
                    <rect
                        key={i}
                        x={i * stepX}
                        y={getY(p.network)}
                        width={stepX - 1}
                        height={Math.max(0, height - getY(p.network))}
                        fill="#1a9fff"
                        opacity="0.8"
                    />
                ))}

                <path d={diskPath} fill="none" stroke="#a1cd44" strokeWidth="2" strokeLinecap="round" />
            </svg>
        );
    };

    return (
        <>
            <Head>
                <title>Install {CURRENT_GAME.title} - GameVerse</title>
            </Head>

            <div className="min-h-screen bg-black text-gray-300 font-sans selection:bg-primary selection:text-white pb-20">

                {/* --- Navbar --- */}
                <div className="h-16 bg-gray-950 flex items-center px-6 justify-between shadow-lg border-b border-gray-800">
                    <div className="flex items-center space-x-8">
                        <span className="text-2xl font-bold tracking-wider text-gray-200 uppercase">GAMEVERSE</span>
                        <div className="flex space-x-6 text-sm font-semibold text-gray-400">
                            <span onClick={() => router.push('/')} className="cursor-pointer hover:text-white">STORE</span>
                            <span onClick={() => router.push('/library')} className="cursor-pointer hover:text-white">LIBRARY</span>
                            <span className="cursor-pointer hover:text-white border-b-4 border-primary pb-4 -mb-4">DOWNLOADS</span>
                            <span className="cursor-pointer hover:text-white">COMMUNITY</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="h-8 w-8 bg-gray-800 rounded hover:bg-gray-700 cursor-pointer flex items-center justify-center">
                            <Download size={16} />
                        </div>
                    </div>
                </div>

                {/* --- Main Content Area --- */}
                <div className="max-w-5xl mx-auto mt-12">

                    {/* Header Section */}
                    <div className="flex justify-between items-end mb-4 px-2">
                        <div>
                            <h1 className="text-xl text-white font-light tracking-wide">DOWNLOADS</h1>
                        </div>
                        <div className="flex items-center space-x-12 text-xs font-bold uppercase tracking-wider">
                            <div className="flex flex-col items-start">
                                <span className="text-gray-500">Current</span>
                                <span className="text-white text-base">{formatSpeed(downloadState.currentNetworkSpeed)}</span>
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-gray-500">Peak</span>
                                <span className="text-gray-400 text-base">{formatSpeed(downloadState.peakNetworkSpeed)}</span>
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-gray-500">Total</span>
                                <span className="text-gray-400 text-base">{formatBytes(downloadState.downloadedBytes)}</span>
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-gray-500">Disk Usage</span>
                                <span className="text-[#a1cd44] text-base">{formatSpeed(downloadState.currentDiskSpeed)}</span>
                            </div>
                        </div>
                    </div>

                    {/* --- The Download Item (Card) --- */}
                    <div className="bg-gray-950 border border-gray-800 relative overflow-hidden group">
                        <div className={`absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none transition-opacity duration-500 ${downloadState.status === 'downloading' ? 'opacity-100' : 'opacity-30'}`}></div>

                        <div className="relative p-6 flex items-start gap-6">

                            {/* Game Art */}
                            <div className="flex-shrink-0 w-[280px] h-[140px] shadow-lg relative bg-black">
                                <img
                                    src={typeof CURRENT_GAME.heroImage === 'string' ? CURRENT_GAME.heroImage : CURRENT_GAME.heroImage.src}
                                    alt="Game Art"
                                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                                />
                            </div>

                            {/* Info & Graph Column */}
                            <div className="flex-grow flex flex-col justify-between h-[140px]">

                                {/* Top Row: Title & Icons */}
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col">
                                        <h2 className="text-xl text-white font-medium tracking-wide">{CURRENT_GAME.title}</h2>
                                        {downloadState.status === 'downloading' && (
                                            <span className="text-[#a1cd44] text-xs font-bold uppercase mt-1 animate-pulse">
                                                Downloading...
                                            </span>
                                        )}
                                        {downloadState.status === 'completed' && (
                                            <span className="text-primary text-xs font-bold uppercase mt-1">
                                                Ready to Play
                                            </span>
                                        )}
                                        {downloadState.status === 'idle' && downloadState.downloadedBytes > 0 && (
                                            <span className="text-yellow-500 text-xs font-bold uppercase mt-1">
                                                Paused
                                            </span>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center space-x-2">
                                        {downloadState.status === 'downloading' ? (
                                            <button onClick={handlePause} className="bg-gray-800 hover:bg-gray-700 p-2 rounded text-primary hover:text-white transition-colors">
                                                <Pause size={20} fill="currentColor" />
                                            </button>
                                        ) : downloadState.status === 'completed' ? (
                                            <button onClick={() => router.push('/library')} className="bg-[#a1cd44] hover:bg-[#8ed32b] px-6 py-2 rounded text-white font-bold tracking-wide uppercase flex items-center gap-2 shadow-[0_0_15px_rgba(161,205,68,0.3)] transition-all">
                                                <Play size={18} fill="currentColor" /> Play
                                            </button>
                                        ) : (
                                            <button onClick={() => setShowInstallModal(true)} className="bg-gray-800 hover:bg-gray-700 p-2 rounded text-primary hover:text-white transition-colors">
                                                {downloadState.downloadedBytes > 0 ? <Download size={20} /> : <span className="font-bold px-2 text-sm">INSTALL</span>}
                                            </button>
                                        )}

                                        <button className="text-gray-600 hover:text-white transition-colors p-1">
                                            <Settings size={20} />
                                        </button>
                                        <button onClick={() => router.push('/library')} className="text-gray-600 hover:text-white transition-colors p-1">
                                            <X size={20} />
                                        </button>
                                    </div>
                                </div>

                                {/* Middle: Bars & Graph */}
                                <div className="flex items-end gap-8 relative h-[60px]">

                                    {/* Progress Bars Section */}
                                    <div className="flex-grow flex flex-col justify-end space-y-1 pb-1">
                                        {/* Network Bar */}
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-primary font-medium uppercase tracking-wider">Downloading</span>
                                            <span className="text-gray-400">
                                                {formatBytes(downloadState.downloadedBytes)} / {formatBytes(CURRENT_GAME.totalSize)}
                                            </span>
                                        </div>
                                        <div className="h-1.5 bg-gray-900 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary shadow-[0_0_10px_currentColor]"
                                                style={{ width: `${percentDownloaded}%`, transition: 'width 0.5s linear' }}
                                            ></div>
                                        </div>

                                        {/* Disk Bar */}
                                        <div className="flex justify-between text-xs mt-2 mb-1">
                                            <span className="text-[#a1cd44] font-medium uppercase tracking-wider">Installing</span>
                                            <span className="text-gray-400">{Math.round(percentDisk)}%</span>
                                        </div>
                                        <div className="h-1.5 bg-gray-900 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-[#a1cd44]"
                                                style={{ width: `${percentDisk}%`, transition: 'width 0.5s linear' }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Graph Section */}
                                    <div className="w-[200px] h-[60px] bg-[#00000030] relative border-b border-l border-gray-800">
                                        {renderGraph()}
                                    </div>
                                </div>

                                {/* Bottom Row: ETA */}
                                <div className="flex justify-between items-center text-xs mt-1 h-5">
                                    <span className="text-gray-500 uppercase font-medium tracking-wide">
                                        {downloadState.status === 'downloading'
                                            ? `Time Remaining: ${formatDuration(timeRemainingSeconds)}`
                                            : downloadState.status === 'completed'
                                                ? 'Update Completed'
                                                : 'Scheduled for Today'
                                        }
                                    </span>
                                    <span className="text-gray-700 text-[10px] uppercase">
                                        Auto-updates enabled
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Install Modal --- */}
                {showInstallModal && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
                        <div className="bg-gradient-to-b from-gray-900 to-black w-[600px] rounded shadow-2xl border border-gray-700 text-gray-300">

                            {/* Modal Header */}
                            <div className="flex justify-between items-center p-4 border-b border-gray-800">
                                <h2 className="text-xl font-light tracking-wide text-white">Install - {CURRENT_GAME.title}</h2>
                                <button onClick={() => setShowInstallModal(false)} className="text-gray-400 hover:text-white">
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 space-y-6">

                                <div className="flex gap-4 items-start bg-gray-950 p-4 rounded">
                                    <div className="w-24 h-32 bg-black flex-shrink-0">
                                        <img src={typeof CURRENT_GAME.coverImage === 'string' ? CURRENT_GAME.coverImage : CURRENT_GAME.coverImage.src} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="text-sm space-y-2">
                                        <p className="text-gray-300">You are about to install <strong className="text-white">{CURRENT_GAME.title}</strong>.</p>
                                        <p className="text-gray-400 text-xs">
                                            Please allow ample time for the download. This game requires a 3D accelerated graphics card.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-8 text-sm">
                                    <div className="space-y-1">
                                        <span className="text-gray-500 block text-xs uppercase font-bold">Disk space required</span>
                                        <span className="text-gray-200 block text-base font-medium">{formatBytes(CURRENT_GAME.diskReq)}</span>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-gray-500 block text-xs uppercase font-bold">Disk space available</span>
                                        <span className="text-gray-200 block text-base font-medium">124.5 GB</span>
                                    </div>
                                    <div className="space-y-1 col-span-2">
                                        <span className="text-gray-500 block text-xs uppercase font-bold">Estimated download time</span>
                                        <span className="text-gray-200 block text-base font-medium">~ 20 minutes at 6 MB/s</span>
                                    </div>
                                </div>

                                {/* Path Selector */}
                                <div className="bg-gray-950 p-3 rounded flex items-center justify-between border border-gray-800 cursor-not-allowed opacity-80">
                                    <div className="flex items-center space-x-3 text-gray-400">
                                        <HardDrive size={18} />
                                        <span className="text-sm">C:\Program Files (x86)\GameVerse</span>
                                    </div>
                                    <ChevronRight size={16} className="text-gray-600" />
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-4 bg-gray-950 flex justify-end gap-3 border-t border-gray-800">
                                <button
                                    onClick={() => setShowInstallModal(false)}
                                    className="px-6 py-2 rounded text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => { setShowInstallModal(false); handleStartDownload(); }}
                                    className="px-8 py-2 rounded bg-gradient-to-r from-primary to-blue-600 hover:brightness-110 text-white font-medium shadow-lg"
                                >
                                    Install
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </>
    );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Skull,
  Ghost,
  Flame,
  AlertTriangle,
  Clock,
  User,
  FileCode,
  Sparkles,
  Copy,
  Check,
  Send,
  Volume2,
  VolumeX,
  Terminal
} from '@/components/icons';
import { CemeteryReport, SuspiciousCommit, GhostFile } from '@/lib/git/types';
import { DEMO_REPOSITORIES } from '@/lib/git/sampleData';

export default function CommitCemetery() {
  const [repoPath, setRepoPath] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<CemeteryReport>(DEMO_REPOSITORIES['zenith-form']);
  const [activeTab, setActiveTab] = useState<'crimes' | 'ghosts' | 'resurrections' | 'gravediggers' | 'seance'>('crimes');
  const [copied, setCopied] = useState(false);

  // Séance state
  const [seanceQuestion, setSeanceQuestion] = useState('');
  const [seanceChat, setSeanceChat] = useState<Array<{ sender: 'mortal' | 'ghost'; text: string }>>([
    {
      sender: 'ghost',
      text: 'Speak, mortal. The commits of the past are listening. Ask what haunts this repository...'
    }
  ]);
  const [seanceLoading, setSeanceLoading] = useState(false);

  // Audio Ambiance state (Web Audio API synth)
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const toggleAudio = () => {
    if (audioPlaying) {
      if (gainRef.current && audioCtxRef.current) {
        gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.5);
        setTimeout(() => {
          oscRef.current?.stop();
          oscRef.current?.disconnect();
          setAudioPlaying(false);
        }, 500);
      }
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(65.41, ctx.currentTime); // C2 spooky low drone

        // LFO for eerie pulsing
        const lfo = ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.2, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(15, ctx.currentTime);
        lfo.connect(osc.frequency);
        lfo.start();

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 1.5);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        audioCtxRef.current = ctx;
        oscRef.current = osc;
        gainRef.current = gain;
        setAudioPlaying(true);
      } catch (e) {
        console.error('Audio init error:', e);
      }
    }
  };

  const handleExhume = async (path?: string, demoKey?: string) => {
    setLoading(true);
    const target = path !== undefined ? path : repoPath;

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          repositoryPath: target || undefined,
          demoType: demoKey || undefined
        })
      });

      if (res.ok) {
        const data: CemeteryReport = await res.json();
        setReport(data);
      } else {
        // Fallback to sample
        setReport(DEMO_REPOSITORIES['zenith-form']);
      }
    } catch {
      setReport(DEMO_REPOSITORIES['zenith-form']);
    } finally {
      setLoading(false);
    }
  };

  const handleAskSeance = async (q?: string) => {
    const query = q || seanceQuestion;
    if (!query.trim() || seanceLoading) return;

    setSeanceChat((prev) => [...prev, { sender: 'mortal', text: query }]);
    setSeanceQuestion('');
    setSeanceLoading(true);

    try {
      const res = await fetch('/api/seance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query, report })
      });

      if (res.ok) {
        const data = await res.json();
        setSeanceChat((prev) => [...prev, { sender: 'ghost', text: data.answer }]);
      } else {
        setSeanceChat((prev) => [
          ...prev,
          {
            sender: 'ghost',
            text: '*The graveyard wind howls...* A spirit of a 2:00 AM hotfix murmurs: "We broke the tests, and the tests broke us."'
          }
        ]);
      }
    } catch {
      setSeanceChat((prev) => [
        ...prev,
        {
          sender: 'ghost',
          text: '*Ectoplasmic interference...* The repository ghosts refuse to speak until you commit with a descriptive message.'
        }
      ]);
    } finally {
      setSeanceLoading(false);
    }
  };

  const handleCopyMarkdown = () => {
    const md = generateMarkdownReport(report);
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen bg-[#06080e] text-slate-200 overflow-x-hidden">
      {/* Background Graveyard Mist & Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-950/20 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-emerald-950/20 rounded-full blur-[130px] pointer-events-none animate-pulse-glow" />

      {/* Main Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 sm:py-12">
        {/* Navigation & Controls */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800/80 mb-8">
          <div className="flex items-center space-x-3">
            <span className="text-2xl animate-float-ghost">🪦</span>
            <span className="font-mono text-xs tracking-widest uppercase bg-purple-950/60 text-purple-300 border border-purple-800/60 px-2.5 py-1 rounded-full">
              Git Forensics & Archaeology Engine
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleAudio}
              className={`flex items-center space-x-2 text-xs font-mono px-3 py-1.5 rounded-lg border transition-all ${
                audioPlaying
                  ? 'bg-purple-950/80 border-purple-500 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              title="Toggle Crypt Synth Ambiance"
            >
              {audioPlaying ? <Volume2 className="w-3.5 h-3.5 text-purple-400 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{audioPlaying ? 'Crypt Drone: Active' : 'Spooky Sound'}</span>
            </button>
            <div className="hidden sm:flex items-center space-x-1.5 text-xs font-mono text-emerald-400/90 bg-emerald-950/40 border border-emerald-800/50 px-3 py-1.5 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>Gemma AI Ready</span>
            </div>
          </div>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-purple-950/40 rounded-2xl border border-purple-800/50 mb-4 shadow-[0_0_30px_rgba(147,51,234,0.15)]">
            <Skull className="w-10 h-10 text-purple-400" />
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-purple-200 via-slate-100 to-emerald-200 bg-clip-text text-transparent font-serif mb-3">
            COMMIT CEMETERY
          </h1>
          <p className="text-base sm:text-lg text-slate-400 font-mono">
            Every repository has a past. Dig through yours to uncover dead code, suspicious midnight commits, and bugs that refused to die.
          </p>
        </div>

        {/* Exhumation Search Bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative flex flex-col sm:flex-row items-stretch bg-slate-900/90 border border-purple-900/60 rounded-xl p-2 shadow-2xl backdrop-blur-md focus-within:border-purple-500 transition-all">
            <div className="flex items-center pl-3 pr-2 text-slate-500">
              <Terminal className="w-5 h-5 text-purple-400" />
            </div>
            <input
              type="text"
              placeholder="Enter local repository path (e.g. . or C:/projects/my-repo)"
              value={repoPath}
              onChange={(e) => setRepoPath(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleExhume()}
              className="flex-1 bg-transparent px-2 py-3 text-sm font-mono text-slate-100 placeholder-slate-600 focus:outline-none"
            />
            <button
              onClick={() => handleExhume()}
              disabled={loading}
              className="mt-2 sm:mt-0 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white font-mono text-sm font-semibold rounded-lg shadow-lg hover:shadow-purple-900/50 transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Ghost className="w-4 h-4 animate-spin text-purple-300" />
                  <span>Exhuming...</span>
                </>
              ) : (
                <>
                  <span>Exhume Repository</span>
                  <span>⛏️</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Demo Repositories */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-mono text-slate-500">
            <span>Or explore archetypal catacombs:</span>
            <button
              onClick={() => handleExhume(undefined, 'zenith-form')}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-purple-300 border border-slate-800 hover:border-purple-700 rounded transition-colors"
            >
              🪦 Zenith Form (2:41 AM Hotfix)
            </button>
            <button
              onClick={() => handleExhume(undefined, 'haunted-saas')}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-slate-800 hover:border-emerald-700 rounded transition-colors"
            >
              🧟 CryptoCasket SaaS (Fad Necromancy)
            </button>
            <button
              onClick={() => handleExhume('.')}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-600 rounded transition-colors"
            >
              📂 This Project (commit-cemetery)
            </button>
          </div>
        </div>

        {/* Autopsy Report Header / Tombstone Banner */}
        <div className="relative bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 rounded-2xl p-6 sm:p-8 mb-8 shadow-2xl overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-emerald-500" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-100 flex items-center space-x-2">
                  <span>{report.summary.repositoryName}</span>
                </h2>
                <span
                  className={`text-xs font-mono px-3 py-1 rounded-full border font-bold ${
                    report.summary.healthGrade.startsWith('F')
                      ? 'bg-red-950/60 border-red-800 text-red-400'
                      : report.summary.healthGrade.startsWith('D')
                      ? 'bg-orange-950/60 border-orange-800 text-orange-400'
                      : 'bg-emerald-950/60 border-emerald-800 text-emerald-400'
                  }`}
                >
                  Condition: {report.summary.healthGrade}
                </span>
              </div>
              <p className="text-xs font-mono text-slate-500 truncate max-w-xl">
                Location: {report.summary.repositoryPath}
              </p>
              <p className="text-sm font-serif italic text-purple-300/90 mt-2">
                &ldquo;{report.summary.epitaph}&rdquo;
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleCopyMarkdown}
                className="flex items-center space-x-2 text-xs font-mono px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Autopsy!' : 'Copy Forensic Report'}</span>
              </button>
            </div>
          </div>

          {/* AI Verdict Box */}
          <div className="mt-6 p-4 sm:p-5 bg-purple-950/20 border border-purple-800/40 rounded-xl relative">
            <div className="flex items-center space-x-2 text-xs font-mono text-purple-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Gemma AI Forensic Necropsy</span>
            </div>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              {report.summary.aiVerdict}
            </p>
            <p className="text-xs text-slate-500 font-mono mt-3 italic">
              {report.summary.ghostStory}
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6 pt-6 border-t border-slate-800/80">
            <div className="bg-slate-900/60 border border-slate-800/80 p-3.5 rounded-xl text-center">
              <span className="text-xs font-mono text-slate-500 block mb-1">Total Commits</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-slate-200">{report.summary.totalCommits}</span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800/80 p-3.5 rounded-xl text-center">
              <span className="text-xs font-mono text-slate-500 block mb-1">Dormant Ghosts</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-purple-400">{report.ghostFiles.length}</span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800/80 p-3.5 rounded-xl text-center">
              <span className="text-xs font-mono text-slate-500 block mb-1">Suspicious Commits</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-red-400">{report.suspiciousCommits.length}</span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800/80 p-3.5 rounded-xl text-center">
              <span className="text-xs font-mono text-slate-500 block mb-1">Resurrections</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-amber-400">{report.resurrections.length}</span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800/80 p-3.5 rounded-xl text-center col-span-2 sm:col-span-1">
              <span className="text-xs font-mono text-slate-500 block mb-1">Cemetery Age</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-slate-300">{report.summary.cemeteryAgeDays}d</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 mb-6 overflow-x-auto space-x-2">
          <button
            onClick={() => setActiveTab('crimes')}
            className={`flex items-center space-x-2 px-4 py-2.5 font-mono text-xs sm:text-sm font-medium border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'crimes'
                ? 'border-purple-500 text-purple-300 bg-purple-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span>Suspicious Commits ({report.suspiciousCommits.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('ghosts')}
            className={`flex items-center space-x-2 px-4 py-2.5 font-mono text-xs sm:text-sm font-medium border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'ghosts'
                ? 'border-purple-500 text-purple-300 bg-purple-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Ghost className="w-4 h-4 text-purple-400" />
            <span>Ghost Files ({report.ghostFiles.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('resurrections')}
            className={`flex items-center space-x-2 px-4 py-2.5 font-mono text-xs sm:text-sm font-medium border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'resurrections'
                ? 'border-purple-500 text-purple-300 bg-purple-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Resurrections ({report.resurrections.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('gravediggers')}
            className={`flex items-center space-x-2 px-4 py-2.5 font-mono text-xs sm:text-sm font-medium border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'gravediggers'
                ? 'border-purple-500 text-purple-300 bg-purple-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4 text-indigo-400" />
            <span>Haunted Developers ({report.hauntedDevelopers.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('seance')}
            className={`flex items-center space-x-2 px-4 py-2.5 font-mono text-xs sm:text-sm font-medium border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'seance'
                ? 'border-emerald-500 text-emerald-300 bg-emerald-950/20'
                : 'border-transparent text-slate-400 hover:text-emerald-300'
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Conduct Séance 🔮</span>
          </button>
        </div>

        {/* TAB 1: Suspicious Commits */}
        {activeTab === 'crimes' && (
          <div className="space-y-4">
            {report.suspiciousCommits.length === 0 ? (
              <div className="p-8 text-center text-slate-500 font-mono bg-slate-900/40 rounded-xl border border-slate-800">
                No overtly cursed commits found. A rare consecrated repository!
              </div>
            ) : (
              report.suspiciousCommits.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/70 border border-slate-800 hover:border-purple-800/80 p-5 rounded-xl transition-all shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center space-x-3">
                      <span
                        className={`text-xs font-mono uppercase px-2.5 py-0.5 rounded font-bold ${
                          item.severity === 'cursed'
                            ? 'bg-red-950 text-red-300 border border-red-800'
                            : item.severity === 'high'
                            ? 'bg-orange-950 text-orange-300 border border-orange-800'
                            : 'bg-yellow-950 text-yellow-300 border border-yellow-800'
                        }`}
                      >
                        {item.severity}
                      </span>
                      <code className="text-xs font-mono text-purple-400 bg-purple-950/50 px-2 py-0.5 rounded border border-purple-900/60">
                        {item.commit.shortHash}
                      </code>
                      <span className="text-xs font-mono text-slate-400 flex items-center space-x-1">
                        <User className="w-3 h-3 text-slate-500 inline" />
                        <span>{item.commit.author}</span>
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-500 flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-slate-600 inline" />
                      <span>{item.commit.date}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-slate-100 font-mono mb-2">
                    &ldquo;{item.commit.message}&rdquo;
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 mb-3">
                    <span className="text-purple-400 font-semibold">Forensic Verdict: </span>
                    {item.verdict}
                  </p>

                  <div className="space-y-1">
                    <span className="text-xs font-mono text-slate-500 block">Evidence Recovered:</span>
                    <ul className="list-disc list-inside text-xs font-mono text-slate-400 space-y-0.5">
                      {item.evidence.map((ev, evIdx) => (
                        <li key={evIdx}>{ev}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: Ghost Files */}
        {activeTab === 'ghosts' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {report.ghostFiles.length === 0 ? (
              <div className="col-span-2 p-8 text-center text-slate-500 font-mono bg-slate-900/40 rounded-xl border border-slate-800">
                No ghost files detected.
              </div>
            ) : (
              report.ghostFiles.map((ghost, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/70 border border-slate-800 hover:border-purple-800/80 p-5 rounded-xl transition-all shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <FileCode className="w-4 h-4 text-purple-400" />
                        <code className="text-xs font-mono font-bold text-slate-200">{ghost.path}</code>
                      </div>
                      <span className="text-xs font-mono bg-slate-800 px-2 py-0.5 rounded text-purple-300">
                        {ghost.daysDead}d dormant
                      </span>
                    </div>

                    <p className="text-xs font-mono text-slate-400 mb-3 leading-relaxed">
                      {ghost.reason}
                    </p>

                    <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800/80 mb-3">
                      <span className="text-xs font-mono text-purple-400 block mb-1">Tombstone Epitaph:</span>
                      <p className="text-xs font-serif italic text-slate-300">&ldquo;{ghost.epitaph}&rdquo;</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500">Last touched by {ghost.commitAuthor}</span>
                    <span className="text-red-400 font-bold">Risk: {ghost.riskScore}/100</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: Resurrections & Reverts */}
        {activeTab === 'resurrections' && (
          <div className="space-y-4">
            {report.resurrections.length === 0 ? (
              <div className="p-8 text-center text-slate-500 font-mono bg-slate-900/40 rounded-xl border border-slate-800">
                No recorded resurrections or reverts found. The dead stayed in their graves.
              </div>
            ) : (
              report.resurrections.map((res, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/70 border border-slate-800 hover:border-amber-800/80 p-5 rounded-xl transition-all shadow-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase bg-amber-950 text-amber-300 px-2.5 py-0.5 rounded font-bold border border-amber-800">
                      {res.crimeType}
                    </span>
                    <span className="text-xs font-mono text-slate-500">{res.date}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-100 font-mono mb-2">{res.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-mono">{res.description}</p>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 4: Haunted Developers */}
        {activeTab === 'gravediggers' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {report.hauntedDevelopers.map((dev, idx) => (
              <div
                key={idx}
                className="bg-slate-900/70 border border-slate-800 hover:border-indigo-800/80 p-5 rounded-xl transition-all shadow-lg text-center"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-indigo-950/60 border border-indigo-800 flex items-center justify-center text-xl mb-3">
                  🧙
                </div>
                <h3 className="text-base font-bold text-slate-100 font-mono">{dev.name}</h3>
                <span className="text-xs font-mono text-purple-400 block mb-2">{dev.title}</span>
                <p className="text-xs font-mono text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 mb-3">
                  {dev.spookyTrait}
                </p>
                <div className="flex justify-between text-xs font-mono text-slate-500 pt-2 border-t border-slate-800/80">
                  <span>Commits: {dev.commitCount}</span>
                  <span className="text-red-400 font-semibold">Crimes: {dev.crimeCount}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: The Séance (Interactive Chat with Repo Ghost) */}
        {activeTab === 'seance' && (
          <div className="bg-slate-900/90 border border-emerald-900/60 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-800 mb-4">
              <div className="p-2 bg-emerald-950/60 border border-emerald-800/80 rounded-lg">
                <Sparkles className="w-5 h-5 text-emerald-400 animate-spin" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-serif text-slate-100">The Séance Chamber</h3>
                <p className="text-xs font-mono text-slate-400">
                  Commune directly with the spirit of {report.summary.repositoryName}. Ask why dead files linger or who broke production.
                </p>
              </div>
            </div>

            {/* Quick Prompt Chips */}
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => handleAskSeance('Who broke production?')}
                className="text-xs font-mono bg-slate-800/90 hover:bg-emerald-950/80 hover:text-emerald-300 border border-slate-700 hover:border-emerald-700 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
              >
                &ldquo;Who broke production?&rdquo;
              </button>
              <button
                onClick={() => handleAskSeance('Is it safe to delete the ghost files?')}
                className="text-xs font-mono bg-slate-800/90 hover:bg-emerald-950/80 hover:text-emerald-300 border border-slate-700 hover:border-emerald-700 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
              >
                &ldquo;Is it safe to delete the ghost files?&rdquo;
              </button>
              <button
                onClick={() => handleAskSeance('Will this codebase ever be refactored?')}
                className="text-xs font-mono bg-slate-800/90 hover:bg-emerald-950/80 hover:text-emerald-300 border border-slate-700 hover:border-emerald-700 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
              >
                &ldquo;Will this codebase ever be refactored?&rdquo;
              </button>
            </div>

            {/* Chat Log */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 h-72 overflow-y-auto space-y-3 mb-4 font-mono text-xs sm:text-sm">
              {seanceChat.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'mortal' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-4 py-2.5 ${
                      msg.sender === 'mortal'
                        ? 'bg-purple-900/60 text-purple-100 border border-purple-700/60'
                        : 'bg-slate-900/90 text-emerald-200 border border-emerald-800/60 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                    }`}
                  >
                    <span className="text-[10px] font-mono text-slate-500 block mb-0.5">
                      {msg.sender === 'mortal' ? 'You' : '👻 Repository Spirit'}
                    </span>
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
              {seanceLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-900/90 text-emerald-300 border border-emerald-800/60 rounded-xl px-4 py-2.5 text-xs font-mono flex items-center space-x-2 animate-pulse">
                    <Ghost className="w-3.5 h-3.5 animate-bounce" />
                    <span>The spirit is meditating upon the reflogs...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Question Input */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Ask the spirit of this repository..."
                value={seanceQuestion}
                onChange={(e) => setSeanceQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAskSeance()}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={() => handleAskSeance()}
                disabled={seanceLoading || !seanceQuestion.trim()}
                className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg font-mono text-xs font-bold transition-all disabled:opacity-50 cursor-pointer flex items-center space-x-1"
              >
                <span>Summon</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Footer / Pitch */}
        <div className="mt-16 text-center text-xs font-mono text-slate-600 pt-8 border-t border-slate-900">
          <p>
            Commit Cemetery • Built with Next.js 16, TypeScript, Tailwind CSS, and local Open-Source AI (Gemma/Ollama).
          </p>
          <p className="mt-1 text-slate-500">
            &ldquo;Your source code never leaves your machine. The ghosts remain between you and your git log.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}

function generateMarkdownReport(report: CemeteryReport): string {
  return `# 🪦 Forensic Autopsy Report: ${report.summary.repositoryName}

**Location**: \`${report.summary.repositoryPath}\`  
**Condition**: ${report.summary.healthGrade}  
**Epitaph**: *"${report.summary.epitaph}"*

---

## 🧠 Gemma AI Forensic Verdict
> ${report.summary.aiVerdict}

*${report.summary.ghostStory}*

---

## 📊 Graveyard Statistics
- **Total Commits Exhumed**: ${report.summary.totalCommits}
- **Contributors Haunted**: ${report.summary.totalContributors}
- **Cemetery Lifespan**: ${report.summary.cemeteryAgeDays} days
- **Necro-Entropy Death Rate**: ${report.summary.deathRate}

---

## ☠️ Flagged Suspicious Commits
${report.suspiciousCommits
  .map(
    (c) => `### \`${c.commit.shortHash}\` — "${c.commit.message}"
- **Author**: ${c.commit.author} (${c.commit.date})
- **Severity**: ${c.severity.toUpperCase()}
- **Verdict**: ${c.verdict}
- **Evidence**:
${c.evidence.map((e) => `  - ${e}`).join('\n')}
`
  )
  .join('\n')}

---

## 👻 Ghost Files (Unreferenced / Dormant)
${report.ghostFiles
  .map(
    (g) => `- **\`${g.path}\`** (${g.daysDead} days dormant)
  - *Reason*: ${g.reason}
  - *Tombstone*: "${g.epitaph}"
  - *Risk*: ${g.riskScore}/100`
  )
  .join('\n')}

---

*Generated by Commit Cemetery — Offline AI Archaeological Forensics for Codebases.*
`;
}

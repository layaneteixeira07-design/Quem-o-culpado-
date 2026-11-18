import React from 'react';
import { motion } from 'motion/react';
import { Play, FolderKanban, BookOpen, Settings, Award, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { GameProgress } from '../types/game';
import { soundManager } from '../utils/audio';

interface HomeScreenProps {
  progress: GameProgress;
  onStartPlaying: () => void;
  onOpenCaseSelect: () => void;
  onOpenInstructions: () => void;
  onOpenSettings: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  progress,
  onStartPlaying,
  onOpenCaseSelect,
  onOpenInstructions,
  onOpenSettings,
  soundEnabled,
  onToggleSound
}) => {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#070b14] select-none">
      {/* Background with the generated atmospheric noir detective image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/detective_cover_bg_1794232504272.jpg"
          alt="Mesa de investigação de detetive à noite"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center brightness-[0.72] contrast-[1.12] scale-105 transition-transform duration-1000"
        />
        {/* Cinematic gradient vignette scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-[#070b14]/75 to-transparent" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#070b14]/50 to-[#070b14]/90" />
      </div>

      {/* Top Bar / Quick Controls */}
      <header className="relative z-10 flex items-center justify-between px-4 sm:px-8 pt-safe pt-4 pb-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-400">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
              {progress.reputationTitle}
            </span>
            <span className="text-sm font-bold text-amber-300 font-mono-code tabular-nums">
              {progress.totalScore} pts
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              onToggleSound();
              soundManager.playClick();
            }}
            aria-label={soundEnabled ? 'Desativar som' : 'Ativar som'}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 backdrop-blur-md transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onOpenSettings();
            }}
            aria-label="Configurações"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 backdrop-blur-md transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Hero & Title Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 max-w-xl mx-auto my-auto py-6">
        {/* Subtle confidential stamp */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono-code uppercase tracking-widest backdrop-blur-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Dossiê de Investigação Criminal</span>
        </motion.div>

        {/* Game Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-mystery text-4xl sm:text-6xl font-black tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
        >
          QUEM É O <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
            CULPADO?
          </span>
        </motion.h1>

        {/* Atmospheric subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-3 text-sm sm:text-base text-slate-300 max-w-md font-sans-app leading-relaxed drop-shadow"
        >
          Examine pistas, interrogue suspeitos, desmascare contradições no mural de evidências e descubra a verdade!
        </motion.p>

        {/* Primary CTA - JOGAR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 w-full max-w-xs"
        >
          <button
            onClick={() => {
              soundManager.playClick();
              onStartPlaying();
            }}
            className="group relative w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-mystery font-bold text-lg tracking-wider uppercase shadow-[0_0_30px_rgba(245,158,11,0.45)] hover:shadow-[0_0_40px_rgba(245,158,11,0.7)] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-slate-950/15 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 fill-slate-950 text-slate-950 ml-0.5" />
            </div>
            <span>JOGAR</span>
          </button>
        </motion.div>

        {/* Secondary Menu Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 grid grid-cols-2 gap-3 w-full max-w-xs"
        >
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenCaseSelect();
            }}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/70 text-slate-200 text-xs font-semibold tracking-wide backdrop-blur-md active:scale-95 transition-all"
          >
            <FolderKanban className="w-4 h-4 text-amber-400" />
            <span>Casos & Níveis</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onOpenInstructions();
            }}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/70 text-slate-200 text-xs font-semibold tracking-wide backdrop-blur-md active:scale-95 transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Passo a Passo</span>
          </button>
        </motion.div>
      </main>

      {/* Footer / Solved Cases Indicator */}
      <footer className="relative z-10 px-4 pb-safe pb-4 text-center">
        <div className="inline-flex items-center gap-4 text-xs text-slate-400 bg-slate-950/70 border border-slate-800/80 px-4 py-2 rounded-full backdrop-blur-md">
          <span>Casos Solucionados: <strong className="text-amber-400">{progress.casesCompleted.length}/4</strong></span>
          <span className="text-slate-600">|</span>
          <span>Dedução: <strong className="text-slate-200">{progress.reputationTitle}</strong></span>
        </div>
      </footer>
    </div>
  );
};

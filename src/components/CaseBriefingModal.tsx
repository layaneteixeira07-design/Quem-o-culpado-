import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, MapPin, Calendar, FileText, Users, Search, AlertTriangle, Play } from 'lucide-react';
import { CaseDossier } from '../types/game';
import { soundManager } from '../utils/audio';

interface CaseBriefingModalProps {
  caseDossier: CaseDossier;
  onStartInvestigation: () => void;
  onBack: () => void;
}

export const CaseBriefingModal: React.FC<CaseBriefingModalProps> = ({
  caseDossier,
  onStartInvestigation,
  onBack
}) => {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col justify-between pb-safe">
      {/* Top Bar */}
      <header className="sticky top-0 z-20 bg-[#070b14]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3 pt-safe flex items-center justify-between">
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar aos Casos</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono-code font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30">
            {caseDossier.codeName}
          </span>
        </div>
      </header>

      {/* Main Dossier Content */}
      <main className="flex-1 max-w-2xl w-full mx-auto p-4 sm:p-6 space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl bg-slate-900/90 border border-slate-700/80 p-5 sm:p-7 shadow-2xl overflow-hidden"
        >
          {/* Vintage Confidential watermark stamp in the background */}
          <div className="absolute top-6 right-6 pointer-events-none opacity-20 rotate-12 border-4 border-rose-500 text-rose-500 font-typewriter font-black text-xl px-4 py-1 uppercase tracking-widest">
            CONFIDENCIAL
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-xs font-mono-code font-bold text-amber-400 tracking-wider uppercase block mb-1">
                Relatório de Inquérito Preliminar
              </span>
              <h1 className="font-mystery text-2xl sm:text-3xl font-black text-white tracking-tight">
                {caseDossier.title}
              </h1>
            </div>

            {/* Quick Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="truncate">{caseDossier.location}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="truncate">{caseDossier.timestamp}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="truncate">{caseDossier.crimeType}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Tempo Estimado: {caseDossier.estimatedTime}</span>
              </div>
            </div>

            {/* Synopsis */}
            <div className="space-y-2 pt-2">
              <h2 className="text-xs font-mono-code uppercase font-semibold text-slate-400 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                O Mistério
              </h2>
              <p className="text-sm text-slate-200 leading-relaxed font-sans-app bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/80">
                {caseDossier.synopsis}
              </p>
            </div>

            {/* Detective Field Notes */}
            <div className="space-y-2">
              <h2 className="text-xs font-mono-code uppercase font-semibold text-amber-400 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-amber-400" />
                Anotações de Campo do Detetive
              </h2>
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-amber-200/90 font-typewriter leading-relaxed">
                "{caseDossier.detectiveNotes}"
              </div>
            </div>

            {/* Available Assets Preview */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-white block text-sm">{caseDossier.suspects.length} Suspeitos</span>
                  <span className="text-slate-400 text-[11px]">Interrogatório ativo</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Search className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-white block text-sm">{caseDossier.scenes.length} Cenários</span>
                  <span className="text-slate-400 text-[11px]">{caseDossier.clues.length} pistas a encontrar</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Sticky Bottom CTA */}
      <footer className="sticky bottom-0 z-20 bg-[#070b14]/95 backdrop-blur-md border-t border-slate-800 p-4 pb-safe">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => {
              soundManager.playClick();
              onStartInvestigation();
            }}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-mystery font-bold text-base tracking-wider uppercase shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:shadow-[0_0_35px_rgba(245,158,11,0.55)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-slate-950 text-slate-950 ml-0.5" />
            <span>INICIAR INVESTIGAÇÃO DO CASO</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

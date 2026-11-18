import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Users, Search, Star, Lock, CheckCircle2, ChevronRight, AlertCircle } from 'lucide-react';
import { CASES_DATA } from '../data/cases';
import { CaseDossier, GameProgress } from '../types/game';
import { soundManager } from '../utils/audio';

interface CaseSelectScreenProps {
  progress: GameProgress;
  onSelectCase: (caseDossier: CaseDossier) => void;
  onBack: () => void;
}

export const CaseSelectScreen: React.FC<CaseSelectScreenProps> = ({
  progress,
  onSelectCase,
  onBack
}) => {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Fácil':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'Médio':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'Difícil':
        return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
      case 'Mestre':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
      default:
        return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    }
  };

  const isCaseUnlocked = (caseItem: CaseDossier) => {
    return progress.totalScore >= caseItem.unlockPointsRequired || progress.casesCompleted.includes(caseItem.id);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col pb-safe">
      {/* Top Header */}
      <header className="sticky top-0 z-20 bg-[#070b14]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3 pt-safe flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playClick();
              onBack();
            }}
            className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center text-slate-300 hover:text-white active:scale-95 transition-all"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-mystery text-lg font-bold text-white tracking-wide">
              Dossiês & Fases
            </h1>
            <p className="text-xs text-slate-400">
              Selecione um caso para investigar
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono-code font-bold tabular-nums">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{Object.values(progress.caseStars).reduce((a, b) => a + b, 0)} / 12 ★</span>
        </div>
      </header>

      {/* Case List Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 space-y-4">
        {CASES_DATA.map((caseItem, idx) => {
          const unlocked = isCaseUnlocked(caseItem);
          const solved = progress.casesCompleted.includes(caseItem.id);
          const stars = progress.caseStars[caseItem.id] || 0;

          return (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className={`relative rounded-2xl border transition-all overflow-hidden ${
                solved
                  ? 'bg-slate-900/60 border-amber-500/40 hover:border-amber-500/70 shadow-[0_4px_20px_rgba(245,158,11,0.08)]'
                  : unlocked
                  ? 'bg-slate-900/80 border-slate-700/80 hover:border-amber-500/50 hover:bg-slate-900 cursor-pointer shadow-lg'
                  : 'bg-slate-950/60 border-slate-800/60 opacity-60 cursor-not-allowed'
              }`}
              onClick={() => {
                if (unlocked) {
                  soundManager.playClick();
                  onSelectCase(caseItem);
                } else {
                  soundManager.playError();
                }
              }}
            >
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono-code font-semibold tracking-wider text-slate-400 uppercase">
                      {caseItem.codeName}
                    </span>

                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getDifficultyColor(caseItem.difficulty)}`}>
                      {caseItem.difficulty}
                    </span>

                    {solved && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
                        <CheckCircle2 className="w-3 h-3 text-amber-400" />
                        Solucionado
                      </span>
                    )}

                    {!unlocked && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/30">
                        <Lock className="w-3 h-3" />
                        Requer {caseItem.unlockPointsRequired} pts
                      </span>
                    )}
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold font-mystery text-white group-hover:text-amber-300 transition-colors">
                    {caseItem.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                    {caseItem.synopsis}
                  </p>

                  {/* Metadata Row */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {caseItem.estimatedTime}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-500" />
                      {caseItem.suspects.length} Suspeitos
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Search className="w-3.5 h-3.5 text-slate-500" />
                      {caseItem.clues.length} Evidências
                    </span>
                  </div>
                </div>

                {/* Right Action / Rating Slot */}
                <div className="flex items-center justify-between sm:justify-end gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map((starIdx) => (
                      <Star
                        key={starIdx}
                        className={`w-4 h-4 ${
                          starIdx <= stars
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-700'
                        }`}
                      />
                    ))}
                  </div>

                  {unlocked ? (
                    <button
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md active:scale-95 transition-transform"
                    >
                      <span>{solved ? 'Reabrir' : 'Investigar'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-1 text-xs text-slate-500 py-2 px-3 rounded-lg bg-slate-900 border border-slate-800">
                      <Lock className="w-3.5 h-3.5 text-slate-600" />
                      <span>Bloqueado</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Tip for unlock */}
        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 flex items-start gap-3 text-xs text-slate-400">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong>Dica de Detetive:</strong> Solucione os casos com deduções precisas e encontre todas as evidências para acumular pontos de reputação e desbloquear as investigações de nível Difícil e Mestre!
          </span>
        </div>
      </main>
    </div>
  );
};

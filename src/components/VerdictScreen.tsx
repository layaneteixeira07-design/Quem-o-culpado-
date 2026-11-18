import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Award, Star, CheckCircle2, XCircle, RotateCcw, ChevronRight, Home, Sparkles, AlertTriangle, ShieldCheck } from 'lucide-react';
import { CaseDossier, GameProgress } from '../types/game';
import { soundManager } from '../utils/audio';

interface VerdictScreenProps {
  caseDossier: CaseDossier;
  isVictory: boolean;
  scoreGained: number;
  starsEarned: number;
  failureReason?: string;
  progress: GameProgress;
  onNextCase?: () => void;
  onRetry: () => void;
  onGoHome: () => void;
}

export const VerdictScreen: React.FC<VerdictScreenProps> = ({
  caseDossier,
  isVictory,
  scoreGained,
  starsEarned,
  failureReason,
  progress,
  onNextCase,
  onRetry,
  onGoHome
}) => {
  useEffect(() => {
    if (isVictory) {
      soundManager.playVictory();
      // Blast confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    } else {
      soundManager.playError();
    }
  }, [isVictory]);

  const culprit = caseDossier.suspects.find((s) => s.id === caseDossier.culpritId);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col justify-between p-4 sm:p-6 pb-safe">
      <main className="max-w-2xl w-full mx-auto my-auto space-y-6">
        {isVictory ? (
          /* Victory Presentation */
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl bg-slate-900/90 border border-amber-500/50 p-6 sm:p-8 shadow-[0_0_50px_rgba(245,158,11,0.15)] space-y-6 text-center"
          >
            <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Award className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono-code uppercase font-bold text-amber-400 tracking-widest block">
                Veredito Final · Julgamento Concluído
              </span>
              <h1 className="font-mystery text-2xl sm:text-4xl font-black text-white">
                CASO SOLUCIONADO COM SUCESSO!
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 font-sans-app">
                O culpado foi formalmente indiciado e não restaram dúvidas perante a lei.
              </p>
            </div>

            {/* Star Rating Animation */}
            <div className="flex items-center justify-center gap-2 py-2">
              {[1, 2, 3].map((starIdx) => (
                <motion.div
                  key={starIdx}
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2 + starIdx * 0.15, type: 'spring' }}
                >
                  <Star
                    className={`w-8 h-8 ${
                      starIdx <= starsEarned
                        ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]'
                        : 'text-slate-700'
                    }`}
                  />
                </motion.div>
              ))}
            </div>

            {/* Score Earned Banner */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-around">
              <div>
                <span className="text-[11px] font-mono-code text-slate-400 block uppercase">Pontuação Obtida</span>
                <span className="font-mono-code font-black text-2xl sm:text-3xl text-amber-300 tabular-nums">
                  +{scoreGained} pts
                </span>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div>
                <span className="text-[11px] font-mono-code text-slate-400 block uppercase">Pontuação Total</span>
                <span className="font-mono-code font-bold text-lg sm:text-xl text-white tabular-nums">
                  {progress.totalScore} pts
                </span>
              </div>
            </div>

            {/* Villain Confession Box */}
            <div className="text-left p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono-code uppercase font-bold text-rose-400">
                  Confissão de {culprit?.name}:
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-typewriter italic leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
                {caseDossier.solutionSummary.confession}
              </p>

              <div className="space-y-1.5 pt-2 border-t border-slate-800/80 text-xs">
                <strong className="text-amber-400 block font-semibold font-sans-app">
                  Como a Lógica Forense Venceu:
                </strong>
                <p className="text-slate-300 leading-relaxed font-sans-app">
                  {caseDossier.solutionSummary.howEvidenceProvedIt}
                </p>
              </div>
            </div>

            {/* Next Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {onNextCase && (
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onNextCase();
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-mystery font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Próximo Caso</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => {
                  soundManager.playClick();
                  onGoHome();
                }}
                className={`w-full py-3.5 px-4 rounded-xl font-mystery font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer ${
                  onNextCase
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                    : 'bg-amber-500 text-slate-950'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Voltar ao Menu</span>
              </button>
            </div>
          </motion.div>
        ) : (
          /* Failure Presentation */
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl bg-slate-900/90 border border-rose-500/50 p-6 sm:p-8 shadow-[0_0_50px_rgba(244,63,94,0.15)] space-y-6 text-center"
          >
            <div className="mx-auto w-16 h-16 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-600/30">
              <XCircle className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono-code uppercase font-bold text-rose-400 tracking-widest block">
                Acusação Rejeitada por Insuficiência Probatória
              </span>
              <h1 className="font-mystery text-2xl sm:text-4xl font-black text-white">
                FALSO CULPADO OU PROVA INVÁLIDA!
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 font-sans-app">
                O juiz e o promotor descartaram as alegações. O verdadeiro culpado permaneceu foragido.
              </p>
            </div>

            {/* Failure Reason Box */}
            <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-left text-xs sm:text-sm text-rose-200 space-y-2 font-sans-app leading-relaxed">
              <strong className="text-rose-400 font-bold block flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                Parecer Judicial:
              </strong>
              <span>
                {failureReason ||
                  'As provas apresentadas não provaram a autoria além de qualquer dúvida razoável. O suspeito indicado possuía um álibi ou a prova material não o vinculava diretamente à cena do crime.'}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 text-left space-y-1">
              <strong className="text-amber-400 font-semibold block">O que fazer agora?</strong>
              <p>
                1. Reabra a investigação e volte aos cenários para encontrar pistas restantes.
                <br />
                2. Interrogue os suspeitos e use o botão "Confrontar Contradição" quando pegá-los mentindo!
              </p>
            </div>

            {/* Retry Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  soundManager.playClick();
                  onRetry();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mystery font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer shadow-lg"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reabrir Investigação</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  onGoHome();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mystery font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer border border-slate-700"
              >
                <Home className="w-4 h-4" />
                <span>Menu Principal</span>
              </button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

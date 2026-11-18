import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, MessageSquare, AlertOctagon, CheckCircle2, ShieldAlert, Award, Activity, HeartCrack, ChevronRight } from 'lucide-react';
import { Suspect, Clue, Question } from '../types/game';
import { soundManager } from '../utils/audio';

interface SuspectsInterrogationProps {
  suspects: Suspect[];
  clues: Clue[];
  discoveredClueIds: string[];
  interrogatedQuestionIds: string[];
  exposedContradictionIds: string[];
  onAskQuestion: (questionId: string) => void;
  onExposeContradiction: (questionId: string) => void;
}

export const SuspectsInterrogation: React.FC<SuspectsInterrogationProps> = ({
  suspects,
  clues,
  discoveredClueIds,
  interrogatedQuestionIds,
  exposedContradictionIds,
  onAskQuestion,
  onExposeContradiction
}) => {
  const [selectedSuspectId, setSelectedSuspectId] = useState<string>(suspects[0]?.id || '');
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const [contradictionMessage, setContradictionMessage] = useState<string | null>(null);

  const selectedSuspect = suspects.find((s) => s.id === selectedSuspectId) || suspects[0];

  const handleSelectSuspect = (suspect: Suspect) => {
    soundManager.playClick();
    setSelectedSuspectId(suspect.id);
    setActiveQuestion(null);
    setContradictionMessage(null);
  };

  const handleAskQuestion = (question: Question) => {
    soundManager.playTypewriter();
    onAskQuestion(question.id);
    setActiveQuestion(question);
    setContradictionMessage(null);
  };

  const handleConfront = (question: Question) => {
    if (!question.contradictedByClueId) return;

    const hasClue = discoveredClueIds.includes(question.contradictedByClueId);
    if (!hasClue) {
      soundManager.playError();
      const clueNeeded = clues.find((c) => c.id === question.contradictedByClueId);
      setContradictionMessage(
        `Você desconfia que é mentira, mas ainda NÃO tem a evidência em mãos para provar! Procure mais pistas nos cenários (Ex: "${clueNeeded?.title || 'Evidência no local'}").`
      );
      return;
    }

    // Successfully exposed contradiction!
    soundManager.playContradiction();
    onExposeContradiction(question.id);
    setContradictionMessage(question.revealNotes || 'Mentira desmascarada com sucesso diante da prova irrefutável!');
  };

  const getNervousnessColor = (val: number) => {
    if (val >= 80) return 'text-rose-400 bg-rose-500/20';
    if (val >= 50) return 'text-amber-400 bg-amber-500/20';
    return 'text-emerald-400 bg-emerald-500/20';
  };

  return (
    <div className="space-y-4">
      {/* Suspects horizontal avatar selector */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar">
        {suspects.map((suspect) => {
          const isSelected = suspect.id === selectedSuspectId;
          const hasExposedLies = suspect.questions.some((q) => exposedContradictionIds.includes(q.id));

          return (
            <button
              key={suspect.id}
              onClick={() => handleSelectSuspect(suspect)}
              className={`flex items-center gap-2.5 p-2 rounded-xl text-left border transition-all shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-amber-500/20 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                  : 'bg-slate-900/80 border-slate-700/60 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm border ${suspect.avatarBg}`}>
                <User className="w-5 h-5 text-amber-300" />
              </div>
              <div className="truncate max-w-[110px] sm:max-w-[130px]">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-xs truncate block">{suspect.name}</span>
                  {hasExposedLies && (
                    <AlertOctagon className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  )}
                </div>
                <span className="text-[10px] text-slate-400 truncate block">{suspect.role}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interrogation Chamber */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-700/80 overflow-hidden shadow-2xl">
        {/* Suspect Profile Banner */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-amber-300 border-2 ${selectedSuspect.avatarBg} shrink-0`}>
              <User className="w-7 h-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-mystery text-lg font-bold text-white">
                  {selectedSuspect.name}
                </h3>
                <span className="text-[11px] font-mono-code px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {selectedSuspect.age} anos
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  {selectedSuspect.role}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 line-clamp-1">{selectedSuspect.bio}</p>
            </div>
          </div>

          {/* Agitation / Nervousness meter */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 shrink-0">
            <Activity className="w-4 h-4 text-rose-400 animate-pulse" />
            <div>
              <div className="flex items-center justify-between gap-2 text-[10px] font-mono-code text-slate-400">
                <span>NÍVEL DE TENSÃO</span>
                <span className="font-bold text-slate-200">{selectedSuspect.nervousness}%</span>
              </div>
              <div className="w-28 h-2 bg-slate-800 rounded-full overflow-hidden mt-1">
                <div
                  className={`h-full transition-all duration-500 ${
                    selectedSuspect.nervousness >= 80
                      ? 'bg-rose-500'
                      : selectedSuspect.nervousness >= 50
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${selectedSuspect.nervousness}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Álibi & Motivo Inicial */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-950/40 border-b border-slate-800 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
            <span className="font-mono-code font-bold text-slate-400 uppercase text-[10px] block">
              Álibi Declarado à Polícia:
            </span>
            <p className="text-slate-300 font-sans-app leading-relaxed">"{selectedSuspect.alibi}"</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
            <span className="font-mono-code font-bold text-amber-400 uppercase text-[10px] block">
              Motivo de Suspeita Levantado:
            </span>
            <p className="text-amber-200/90 font-sans-app leading-relaxed">{selectedSuspect.initialMotive}</p>
          </div>
        </div>

        {/* Questions and Dialogue */}
        <div className="p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-code uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-amber-400" />
              Perguntas do Interrogatório ({selectedSuspect.questions.length})
            </span>
            <span className="text-[11px] text-slate-500">Toque em uma pergunta para ouvir o depoimento</span>
          </div>

          {/* Question Buttons */}
          <div className="space-y-2">
            {selectedSuspect.questions.map((q) => {
              const isAsked = interrogatedQuestionIds.includes(q.id);
              const isExposed = exposedContradictionIds.includes(q.id);
              const isCurrent = activeQuestion?.id === q.id;

              return (
                <button
                  key={q.id}
                  onClick={() => handleAskQuestion(q)}
                  className={`w-full p-3.5 rounded-xl text-left border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                    isCurrent
                      ? 'bg-amber-500/15 border-amber-500 text-white shadow-md'
                      : isAsked
                      ? 'bg-slate-900/70 border-slate-800 text-slate-300 hover:bg-slate-800/80'
                      : 'bg-slate-950/70 border-slate-800/80 text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold ${
                      isExposed
                        ? 'bg-rose-500 text-white'
                        : isAsked
                        ? 'bg-amber-500/30 text-amber-300'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {isExposed ? '!' : '?'}
                    </div>
                    <span className="text-xs sm:text-sm font-medium">{q.question}</span>
                  </div>

                  {isExposed ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 shrink-0">
                      Mentira Exposta
                    </span>
                  ) : isAsked ? (
                    <span className="text-[10px] text-slate-500 shrink-0">Ouvido</span>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Question Dialogue Box */}
          <AnimatePresence>
            {activeQuestion && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-700/80 space-y-3"
              >
                <div className="flex items-center gap-2 text-xs font-mono-code text-slate-400">
                  <span className="font-bold text-amber-400">{selectedSuspect.name}:</span>
                  <span>"Depoimento gravado"</span>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-sm font-typewriter leading-relaxed">
                  "{activeQuestion.answer}"
                </div>

                {/* Confront Button if Question has Contradiction */}
                {activeQuestion.isLie && !exposedContradictionIds.includes(activeQuestion.id) && (
                  <div className="pt-2">
                    <button
                      onClick={() => handleConfront(activeQuestion)}
                      className="w-full py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
                    >
                      <ShieldAlert className="w-4 h-4" />
                      <span>CONFRONTAR COM EVIDÊNCIA / APONTAR CONTRADIÇÃO</span>
                    </button>
                  </div>
                )}

                {/* Contradiction feedback notice */}
                {contradictionMessage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/40 text-xs text-rose-200 space-y-1 font-sans-app leading-relaxed"
                  >
                    <strong className="text-rose-400 font-bold block flex items-center gap-1.5">
                      <AlertOctagon className="w-4 h-4" />
                      Análise do Confronto:
                    </strong>
                    <span>{contradictionMessage}</span>
                  </motion.div>
                )}

                {exposedContradictionIds.includes(activeQuestion.id) && !contradictionMessage && (
                  <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-400" />
                    <span>Contradição já comprovada formalmente nos autos do inquérito! (+250 pts)</span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

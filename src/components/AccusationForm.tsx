import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Scale, ShieldAlert, CheckCircle, AlertTriangle, User, Search, Target, FileText, Lock, ArrowRight } from 'lucide-react';
import { CaseDossier } from '../types/game';
import { soundManager } from '../utils/audio';

interface AccusationFormProps {
  caseDossier: CaseDossier;
  discoveredClueIds: string[];
  onGoToScenes?: () => void;
  onVerdictSubmit: (accusation: {
    suspectId: string;
    evidenceId: string;
    motiveId: string;
    methodId: string;
  }) => void;
}

export const AccusationForm: React.FC<AccusationFormProps> = ({
  caseDossier,
  discoveredClueIds,
  onGoToScenes,
  onVerdictSubmit
}) => {
  const [selectedSuspectId, setSelectedSuspectId] = useState<string>('');
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string>('');
  const [selectedMotiveId, setSelectedMotiveId] = useState<string>('');
  const [selectedMethodId, setSelectedMethodId] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const totalClues = caseDossier.clues.length;
  const foundCount = discoveredClueIds.length;
  const canAccuse = foundCount >= totalClues;

  // Filter only discovered clues so player cannot use clues they didn't discover yet!
  const availableClues = caseDossier.clues.filter((c) => discoveredClueIds.includes(c.id));

  const handleAcusar = () => {
    if (!canAccuse) {
      soundManager.playError();
      return;
    }
    if (!selectedSuspectId) {
      soundManager.playError();
      setValidationError('Você deve selecionar quem é o principal suspeito/culpado!');
      return;
    }
    if (!selectedEvidenceId) {
      soundManager.playError();
      setValidationError('Você deve selecionar a Prova Irrefutável que desmonta o álibi!');
      return;
    }
    if (!selectedMotiveId) {
      soundManager.playError();
      setValidationError('Você deve selecionar qual foi a Motivação comprovada do crime!');
      return;
    }
    if (!selectedMethodId) {
      soundManager.playError();
      setValidationError('Você deve selecionar Como o crime foi executado!');
      return;
    }

    setValidationError(null);
    onVerdictSubmit({
      suspectId: selectedSuspectId,
      evidenceId: selectedEvidenceId,
      motiveId: selectedMotiveId,
      methodId: selectedMethodId
    });
  };

  if (!canAccuse) {
    const progressPercent = totalClues > 0 ? Math.round((foundCount / totalClues) * 100) : 0;

    return (
      <div className="space-y-4">
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-amber-500/30 shadow-2xl space-y-5">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-amber-400 block">
                Tribunal Aguardando Provas
              </span>
              <h2 className="font-mystery text-lg sm:text-xl font-bold text-white mt-0.5">
                Encontre as Provas no Cenário Primeiro
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                O Promotor não aceita acusações baseadas em palpites. Explore todos os cenários do crime e colete as provas antes de emitir o mandado de prisão.
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono-code">
              <span className="text-slate-400">Provas Coletadas nos Cenários</span>
              <span className="font-bold text-amber-400 tabular-nums">
                {foundCount} / {totalClues} ({progressPercent}%)
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Scene-by-scene Checklist */}
          <div className="space-y-2">
            <span className="text-xs font-mono-code uppercase font-bold text-slate-400 block">
              Progresso por Cenário:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {caseDossier.scenes.map((scene) => {
                const totalInScene = scene.hotspots.length;
                const foundInScene = scene.hotspots.filter((h) => discoveredClueIds.includes(h.clueId)).length;
                const isDone = foundInScene >= totalInScene;

                return (
                  <div
                    key={scene.id}
                    className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                      isDone
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300'
                    }`}
                  >
                    <span className="font-medium truncate pr-2">{scene.name}</span>
                    <span className="font-mono-code font-bold shrink-0 tabular-nums">
                      {foundInScene}/{totalInScene}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {onGoToScenes && (
            <button
              onClick={() => {
                soundManager.playClick();
                onGoToScenes();
              }}
              className="w-full py-3.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mystery font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Explorar Cenários para Encontrar Provas</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-red-950/60 via-slate-900 to-slate-950 border border-red-500/40 shadow-xl space-y-2">
        <div className="flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-600/30 shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-mystery text-base sm:text-lg font-bold text-white tracking-wide">
                Tribunal de Acusação Formal
              </h2>
              <p className="text-xs text-red-200/80">
                Todas as provas foram reunidas. Apresente o culpado, a prova material e o motivo!
              </p>
            </div>
          </div>
        </div>
      </div>

      {validationError && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-xl bg-rose-950/70 border border-rose-500/60 text-xs text-rose-200 flex items-center gap-2"
        >
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{validationError}</span>
        </motion.div>
      )}

      {/* Step 1: Quem é o Culpado? */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono-code uppercase font-bold text-amber-400 flex items-center gap-1.5">
            <User className="w-4 h-4" />
            1. Quem é o Verdadeiro Culpado?
          </span>
          {selectedSuspectId && (
            <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> Selecionado
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {caseDossier.suspects.map((suspect) => {
            const isSelected = selectedSuspectId === suspect.id;

            return (
              <button
                key={suspect.id}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedSuspectId(suspect.id);
                  setValidationError(null);
                }}
                className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-500 text-white shadow-md'
                    : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${suspect.avatarBg} shrink-0`}>
                  <User className="w-4 h-4 text-amber-300" />
                </div>
                <div className="truncate">
                  <span className="font-bold text-xs truncate block">{suspect.name}</span>
                  <span className="text-[10px] text-slate-400 truncate block">{suspect.role}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: A Prova Irrefutável */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono-code uppercase font-bold text-amber-400 flex items-center gap-1.5">
            <Search className="w-4 h-4" />
            2. Qual é a Prova Material Irrefutável?
          </span>
          <span className="text-[11px] text-slate-400 font-mono-code">
            {availableClues.length} provas em mãos
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {availableClues.map((clue) => {
            const isSelected = selectedEvidenceId === clue.id;

            return (
              <button
                key={clue.id}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedEvidenceId(clue.id);
                  setValidationError(null);
                }}
                className={`p-3 rounded-xl border text-left transition-all space-y-1 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-500 text-white shadow-md'
                    : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs truncate">{clue.title}</span>
                  <span className={`text-[9px] font-mono-code px-1.5 py-0.5 rounded ${
                    clue.isKeyEvidence ? 'text-rose-400 bg-rose-500/10' : 'text-slate-400'
                  }`}>
                    {clue.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2">{clue.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 3: O Motivo Real */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-3">
        <span className="text-xs font-mono-code uppercase font-bold text-amber-400 flex items-center gap-1.5">
          <Target className="w-4 h-4" />
          3. Qual foi a Motivação Comprovada?
        </span>

        <div className="space-y-2">
          {caseDossier.motiveOptions.map((opt) => {
            const isSelected = selectedMotiveId === opt.id;

            return (
              <button
                key={opt.id}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedMotiveId(opt.id);
                  setValidationError(null);
                }}
                className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center gap-2.5 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-500 text-white shadow-md'
                    : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                  isSelected ? 'border-amber-400 bg-amber-400' : 'border-slate-600'
                }`}>
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                </div>
                <span className="font-medium">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 4: O Método do Crime */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-3">
        <span className="text-xs font-mono-code uppercase font-bold text-amber-400 flex items-center gap-1.5">
          <FileText className="w-4 h-4" />
          4. Como o Crime Foi Executado?
        </span>

        <div className="space-y-2">
          {caseDossier.methodOptions.map((opt) => {
            const isSelected = selectedMethodId === opt.id;

            return (
              <button
                key={opt.id}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedMethodId(opt.id);
                  setValidationError(null);
                }}
                className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center gap-2.5 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-500 text-white shadow-md'
                    : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                  isSelected ? 'border-amber-400 bg-amber-400' : 'border-slate-600'
                }`}>
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                </div>
                <span className="font-medium">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Final Submit Button */}
      <div className="pt-2">
        <button
          onClick={handleAcusar}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-mystery font-bold text-sm sm:text-base uppercase tracking-wider shadow-lg shadow-red-600/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <ShieldAlert className="w-5 h-5" />
          <span>EMITIR MANDADO DE PRISÃO & FECHAR CASO</span>
        </button>
      </div>
    </div>
  );
};

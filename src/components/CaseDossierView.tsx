import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, CheckCircle2, Clock, MapPin, Users, Search, AlertOctagon, FileText } from 'lucide-react';
import { CaseDossier, Clue, Suspect } from '../types/game';

interface CaseDossierViewProps {
  caseDossier: CaseDossier;
  discoveredClueIds: string[];
  interrogatedQuestionIds: string[];
  exposedContradictionIds: string[];
}

export const CaseDossierView: React.FC<CaseDossierViewProps> = ({
  caseDossier,
  discoveredClueIds,
  interrogatedQuestionIds,
  exposedContradictionIds
}) => {
  return (
    <div className="space-y-4">
      {/* Notebook Dossier Cover */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h2 className="font-mystery text-base sm:text-lg font-bold text-white">
              Caderno de Campo do Investigador
            </h2>
          </div>
          <span className="text-[11px] font-mono-code text-amber-400 uppercase bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            {caseDossier.codeName}
          </span>
        </div>

        {/* Synopsis & Crime Facts */}
        <div className="space-y-2">
          <span className="text-xs font-mono-code uppercase text-slate-400 font-bold block">
            Resumo dos Fatos Ocorridos:
          </span>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans-app bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            {caseDossier.synopsis}
          </p>
        </div>

        {/* Clues Summary Progress */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-code uppercase font-bold text-amber-400 flex items-center gap-1.5">
              <Search className="w-4 h-4" />
              Inventário de Evidências ({discoveredClueIds.length}/{caseDossier.clues.length})
            </span>
            <span className="text-[11px] font-mono-code text-slate-400">
              {Math.round((discoveredClueIds.length / caseDossier.clues.length) * 100)}% Coletado
            </span>
          </div>

          <div className="space-y-2">
            {caseDossier.clues.map((clue) => {
              const isFound = discoveredClueIds.includes(clue.id);

              return (
                <div
                  key={clue.id}
                  className={`p-3 rounded-xl border text-xs flex items-start gap-3 ${
                    isFound
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                      : 'bg-slate-950/40 border-slate-800 text-slate-500'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                    isFound ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-600'
                  }`}>
                    {isFound ? <CheckCircle2 className="w-3.5 h-3.5" /> : <div className="w-2 h-2 rounded-full bg-slate-600" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`font-bold ${isFound ? 'text-white' : 'text-slate-500'}`}>
                        {isFound ? clue.title : '??? Evidência ainda não descoberta'}
                      </span>
                      {isFound && (
                        <span className="text-[10px] font-mono-code text-amber-400 bg-amber-500/20 px-1.5 py-0.5 rounded">
                          {clue.category}
                        </span>
                      )}
                    </div>
                    {isFound && (
                      <p className="mt-1 text-slate-300 text-[11px] leading-relaxed font-sans-app">
                        {clue.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Suspects Deposition Summary */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-mono-code uppercase font-bold text-amber-400 flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            Status dos Interrogatórios & Contradições
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {caseDossier.suspects.map((s) => {
              const askedCount = s.questions.filter((q) => interrogatedQuestionIds.includes(q.id)).length;
              const hasExposed = s.questions.some((q) => exposedContradictionIds.includes(q.id));

              return (
                <div key={s.id} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white font-sans-app">{s.name}</span>
                    <span className="text-[10px] text-slate-400">{s.role}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">
                      Perguntas: {askedCount}/{s.questions.length}
                    </span>
                    {hasExposed ? (
                      <span className="text-rose-400 font-bold flex items-center gap-1">
                        <AlertOctagon className="w-3 h-3" /> Mentira Provada
                      </span>
                    ) : (
                      <span className="text-slate-500">Sem contradição exposta</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

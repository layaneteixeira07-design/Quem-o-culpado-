import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Pin, User, Search, Link2, Unlink, Sparkles, AlertOctagon, HelpCircle } from 'lucide-react';
import { Suspect, Clue, EvidenceConnection } from '../types/game';
import { soundManager } from '../utils/audio';

interface CrimeBoardProps {
  suspects: Suspect[];
  clues: Clue[];
  discoveredClueIds: string[];
  connections: EvidenceConnection[];
  exposedContradictionIds: string[];
  onToggleConnection: (suspectId: string, clueId: string) => void;
}

export const CrimeBoard: React.FC<CrimeBoardProps> = ({
  suspects,
  clues,
  discoveredClueIds,
  connections,
  exposedContradictionIds,
  onToggleConnection
}) => {
  const [selectedSuspectId, setSelectedSuspectId] = useState<string | null>(null);

  const discoveredClues = clues.filter((c) => discoveredClueIds.includes(c.id));

  const isConnected = (suspectId: string, clueId: string) => {
    return connections.some((c) => c.suspectId === suspectId && c.clueId === clueId);
  };

  const handleClueClick = (clueId: string) => {
    if (selectedSuspectId) {
      soundManager.playPin();
      onToggleConnection(selectedSuspectId, clueId);
    } else {
      soundManager.playClick();
    }
  };

  return (
    <div className="space-y-4">
      {/* Instructions header banner */}
      <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-600/30 text-xs text-amber-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Pin className="w-4 h-4" />
          </div>
          <div>
            <strong className="text-white font-mystery font-bold block text-sm">
              Mural de Cortiça Investigativa
            </strong>
            <span>
              {selectedSuspectId
                ? 'Selecione uma evidência abaixo para ligar ou desligar o fio vermelho de dedução!'
                : 'Toque em um suspeito para começar a conectar provas com o fio vermelho.'}
            </span>
          </div>
        </div>

        {selectedSuspectId && (
          <button
            onClick={() => {
              soundManager.playClick();
              setSelectedSuspectId(null);
            }}
            className="text-[11px] font-semibold px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 shrink-0 self-start sm:self-center"
          >
            Limpar Seleção
          </button>
        )}
      </div>

      {/* Crime Board Layout */}
      <div className="relative rounded-2xl bg-[#1c1613] border-4 border-[#3e2723] p-4 sm:p-6 shadow-2xl overflow-hidden min-h-[460px]">
        {/* Corkboard Texture Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(#d9770610_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-40" />

        <div className="relative z-10 space-y-6">
          {/* Top Section: Suspect Polaroid Cards */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono-code uppercase font-bold text-amber-400 tracking-wider flex items-center gap-1.5">
                <User className="w-4 h-4" />
                1. Suspeitos sob Investigação ({suspects.length})
              </span>
              <span className="text-[11px] text-amber-200/60 font-typewriter">Toque no suspeito para vincular</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {suspects.map((suspect) => {
                const isSelected = selectedSuspectId === suspect.id;
                const suspectConns = connections.filter((c) => c.suspectId === suspect.id);
                const hasExposedLie = suspect.questions.some((q) => exposedContradictionIds.includes(q.id));

                return (
                  <button
                    key={suspect.id}
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedSuspectId(isSelected ? null : suspect.id);
                    }}
                    className={`relative p-3 rounded-xl text-left transition-all border shadow-md cursor-pointer ${
                      isSelected
                        ? 'bg-amber-100 text-slate-900 border-amber-400 ring-4 ring-amber-400/30 scale-[1.02]'
                        : 'bg-[#2b211b] text-amber-100/90 border-[#4a3528] hover:border-amber-500/60'
                    }`}
                  >
                    {/* Red push-pin */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-600 border border-red-400 shadow-md flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
                    </div>

                    <div className="mt-1 flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${suspect.avatarBg}`}>
                        <User className="w-4 h-4 text-amber-300" />
                      </div>
                      <div className="truncate">
                        <span className="font-bold text-xs truncate block font-sans-app">
                          {suspect.name}
                        </span>
                        <span className="text-[10px] opacity-75 truncate block">
                          {suspect.role}
                        </span>
                      </div>
                    </div>

                    {/* Suspect Connected Clues Counter */}
                    <div className="mt-2.5 pt-2 border-t border-black/10 flex items-center justify-between text-[10px] font-mono-code">
                      <span className="flex items-center gap-1 font-bold">
                        <Link2 className="w-3 h-3 text-red-500" />
                        {suspectConns.length} ligações
                      </span>
                      {hasExposedLie && (
                        <span className="text-red-500 font-bold flex items-center gap-0.5">
                          <AlertOctagon className="w-3 h-3" /> Mentiroso
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Section: Discovered Evidence Cards */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono-code uppercase font-bold text-amber-400 tracking-wider flex items-center gap-1.5">
                <Search className="w-4 h-4" />
                2. Evidências & Provas Coletadas ({discoveredClues.length}/{clues.length})
              </span>
              <span className="text-[11px] text-amber-200/60 font-typewriter">
                {selectedSuspectId ? 'Clique para ligar ao suspeito' : 'Encontradas nos cenários'}
              </span>
            </div>

            {discoveredClues.length === 0 ? (
              <div className="p-8 text-center rounded-xl bg-black/30 border border-[#3e2723] text-amber-200/60 text-xs font-typewriter">
                Nenhuma evidência coletada ainda! Acesse a aba "Cenário" para examinar as salas e coletar provas.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {discoveredClues.map((clue) => {
                  const connectedToSelected = selectedSuspectId ? isConnected(selectedSuspectId, clue.id) : false;
                  const allSuspectsLinked = suspects.filter((s) => isConnected(s.id, clue.id));

                  return (
                    <div
                      key={clue.id}
                      onClick={() => handleClueClick(clue.id)}
                      className={`relative p-3.5 rounded-xl border transition-all text-xs cursor-pointer ${
                        connectedToSelected
                          ? 'bg-amber-100 text-slate-900 border-red-500 shadow-md ring-2 ring-red-500/50'
                          : selectedSuspectId
                          ? 'bg-[#2b211b] text-amber-100/90 border-[#4a3528] hover:border-amber-400'
                          : 'bg-[#2b211b] text-amber-100/90 border-[#4a3528]'
                      }`}
                    >
                      {/* Sticky tape graphic at top */}
                      <div className="absolute -top-1.5 left-4 w-10 h-3 bg-amber-200/40 rotate-[-4deg] rounded-sm pointer-events-none" />

                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-xs block font-mystery">
                          {clue.title}
                        </span>
                        <span className={`text-[9px] font-mono-code px-1.5 py-0.5 rounded uppercase ${
                          clue.isKeyEvidence ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-blue-500/20 text-blue-300'
                        }`}>
                          {clue.category}
                        </span>
                      </div>

                      <p className="mt-1.5 text-[11px] opacity-80 leading-relaxed font-sans-app line-clamp-2">
                        {clue.description}
                      </p>

                      {/* Connection pill indicators */}
                      <div className="mt-2.5 pt-2 border-t border-black/20 flex flex-wrap items-center justify-between gap-1 text-[10px]">
                        <span className="font-typewriter text-amber-400">
                          {clue.sceneName}
                        </span>

                        {selectedSuspectId ? (
                          <span className={`inline-flex items-center gap-1 font-bold ${
                            connectedToSelected ? 'text-red-600' : 'text-slate-400'
                          }`}>
                            {connectedToSelected ? <Unlink className="w-3 h-3" /> : <Link2 className="w-3 h-3" />}
                            {connectedToSelected ? 'Desvincular' : 'Ligar Fio'}
                          </span>
                        ) : (
                          allSuspectsLinked.length > 0 && (
                            <span className="inline-flex items-center gap-1 text-red-400 font-bold font-mono-code">
                              <Link2 className="w-3 h-3" />
                              {allSuspectsLinked.map((s) => s.name.split(' ')[0]).join(', ')}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, CheckCircle2, ChevronRight, Eye, Sparkles, BookOpen, Flower2,
  FileText, UtensilsCrossed, Wine, ChefHat, Crown, Shield, Lock, Coffee,
  Luggage, Scale, Users, ArrowRight
} from 'lucide-react';
import { Scene, Clue, Hotspot } from '../types/game';
import { soundManager } from '../utils/audio';

interface SceneExplorerProps {
  scenes: Scene[];
  clues: Clue[];
  discoveredClueIds: string[];
  onDiscoverClue: (clueId: string) => void;
  onGoToAccuse?: () => void;
  onGoToSuspects?: () => void;
}

export const SceneExplorer: React.FC<SceneExplorerProps> = ({
  scenes,
  clues,
  discoveredClueIds,
  onDiscoverClue,
  onGoToAccuse,
  onGoToSuspects
}) => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);

  const currentScene = scenes[activeSceneIndex] || scenes[0];
  const allCluesFound = discoveredClueIds.length >= clues.length;

  const getSceneIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen className="w-4 h-4" />;
      case 'Flower2': return <Flower2 className="w-4 h-4" />;
      case 'FileText': return <FileText className="w-4 h-4" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-4 h-4" />;
      case 'Wine': return <Wine className="w-4 h-4" />;
      case 'ChefHat': return <ChefHat className="w-4 h-4" />;
      case 'Crown': return <Crown className="w-4 h-4" />;
      case 'Shield': return <Shield className="w-4 h-4" />;
      case 'Lock': return <Lock className="w-4 h-4" />;
      case 'Coffee': return <Coffee className="w-4 h-4" />;
      case 'Luggage': return <Luggage className="w-4 h-4" />;
      default: return <Search className="w-4 h-4" />;
    }
  };

  const handleHotspotClick = (hotspot: Hotspot) => {
    const isNew = !discoveredClueIds.includes(hotspot.clueId);
    if (isNew) {
      soundManager.playClueFound();
      onDiscoverClue(hotspot.clueId);
    } else {
      soundManager.playClick();
    }
    setSelectedHotspot(hotspot);
  };

  const getClueForHotspot = (clueId: string) => {
    return clues.find((c) => c.id === clueId);
  };

  // Calculate clues discovered in current scene
  const sceneClueIds = currentScene.hotspots.map((h) => h.clueId);
  const discoveredInScene = sceneClueIds.filter((id) => discoveredClueIds.includes(id)).length;
  const isCurrentSceneComplete = discoveredInScene >= currentScene.hotspots.length;

  // Find another scene that still has uncollected clues
  const nextIncompleteSceneIndex = scenes.findIndex((scene, idx) =>
    idx !== activeSceneIndex && scene.hotspots.some((h) => !discoveredClueIds.includes(h.clueId))
  );

  return (
    <div className="space-y-4">
      {/* Status Banner: Evidence Progress / Unlocked Accusation */}
      {allCluesFound ? (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-amber-950/40 border border-emerald-500/40 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-mystery text-sm font-bold text-white">
                Todas as {clues.length} provas do cenário foram encontradas!
              </h3>
              <p className="text-xs text-emerald-200/80">
                A acusação formal foi liberada. Você já pode acusar o culpado ou revisar os depoimentos.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onGoToSuspects && (
              <button
                onClick={() => {
                  soundManager.playClick();
                  onGoToSuspects();
                }}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Suspeitos</span>
              </button>
            )}
            {onGoToAccuse && (
              <button
                onClick={() => {
                  soundManager.playClick();
                  onGoToAccuse();
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-red-600/30 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Acusar Culpado</span>
              </button>
            )}
          </div>
        </motion.div>
      ) : (
        <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-white block">
                Encontre as provas nos cenários para liberar a Acusação
              </span>
              <span className="text-[11px] text-slate-400">
                Provas coletadas: <strong className="text-amber-400 font-mono-code">{discoveredClueIds.length} de {clues.length}</strong>
              </span>
            </div>
          </div>

          {isCurrentSceneComplete && nextIncompleteSceneIndex !== -1 && (
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveSceneIndex(nextIncompleteSceneIndex);
                setSelectedHotspot(null);
              }}
              className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 shrink-0 cursor-pointer whitespace-nowrap"
            >
              <span>Próximo Local</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Scene Switcher Tabs (Ergonomic horizontal scroll) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {scenes.map((scene, idx) => {
          const isActive = idx === activeSceneIndex;
          const isComplete = scene.hotspots.every((h) => discoveredClueIds.includes(h.clueId));

          return (
            <button
              key={scene.id}
              onClick={() => {
                soundManager.playClick();
                setActiveSceneIndex(idx);
                setSelectedHotspot(null);
              }}
              className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
              }`}
            >
              {getSceneIcon(scene.icon)}
              <span>{scene.name}</span>
              {isComplete && (
                <CheckCircle2 className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-emerald-400'}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Scene Card */}
      <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700/80 overflow-hidden shadow-2xl">
        {/* Scene Info Strip */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between gap-4">
          <div>
            <h3 className="font-mystery text-base font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">Ambiente:</span> {currentScene.name}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{currentScene.description}</p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[11px] font-mono-code text-slate-400 block">Pistas</span>
            <span className="text-xs font-mono-code font-bold text-amber-400">
              {discoveredInScene} / {currentScene.hotspots.length}
            </span>
          </div>
        </div>

        {/* Interactive Crime Scene Canvas / Backdrop */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[280px] bg-slate-950 overflow-hidden select-none">
          {/* Stylized architectural noir illustration mesh for the room */}
          <div className={`absolute inset-0 bg-gradient-to-br ${currentScene.ambientTone} opacity-90`} />

          {/* Grid lines and crime scene investigation aesthetic */}
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf815_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          {/* Room Ambient Graphics (Chalk Outline / Furniture Silhouettes) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <Search className="w-48 h-48 text-amber-500/20" />
          </div>

          {/* Crime Scene Tape Graphic at bottom */}
          <div className="absolute bottom-2 left-3 right-3 py-1 px-3 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-[10px] font-mono-code text-amber-300/80 uppercase">
            <span>● ÁREA PERICIAL ISOLADA</span>
            <span>TOQUE NOS PONTOS DE INTERESSE</span>
          </div>

          {/* Hotspots */}
          {currentScene.hotspots.map((hotspot) => {
            const isFound = discoveredClueIds.includes(hotspot.clueId);

            return (
              <div
                key={hotspot.id}
                style={{
                  top: `${hotspot.y}%`,
                  left: `${hotspot.x}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                className="absolute z-10"
              >
                <button
                  onClick={() => handleHotspotClick(hotspot)}
                  aria-label={hotspot.title}
                  className={`group relative flex items-center justify-center rounded-full transition-transform active:scale-90 cursor-pointer ${
                    isFound
                      ? 'w-10 h-10 bg-amber-500/90 text-slate-950 border-2 border-white shadow-[0_0_15px_rgba(245,158,11,0.6)]'
                      : 'w-11 h-11 bg-slate-900/90 text-amber-400 border-2 border-amber-400/80 shadow-[0_0_20px_rgba(245,158,11,0.5)] animate-pulse'
                  }`}
                >
                  {isFound ? (
                    <CheckCircle2 className="w-5 h-5 fill-slate-950 text-amber-400" />
                  ) : (
                    <Search className="w-5 h-5" />
                  )}

                  {/* Tooltip on hover / touch */}
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/95 text-white border border-slate-700 text-[11px] font-medium py-0.5 px-2 rounded pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-md">
                    {hotspot.title}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        {/* List of inspection hotspots below for quick tactile access on mobile */}
        <div className="p-4 bg-slate-900/60 border-t border-slate-800 space-y-2">
          <span className="text-[11px] font-mono-code uppercase text-slate-400 tracking-wider block">
            Pontos de Inspeção no Local:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {currentScene.hotspots.map((h) => {
              const isFound = discoveredClueIds.includes(h.clueId);

              return (
                <button
                  key={h.id}
                  onClick={() => handleHotspotClick(h)}
                  className={`flex items-center justify-between p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
                    isFound
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${
                      isFound ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {isFound ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </div>
                    <span className="font-medium truncate">{h.title}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Clue Inspection Modal */}
      <AnimatePresence>
        {selectedHotspot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#0e1424] border border-amber-500/40 rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="p-4 bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border-b border-amber-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono-code uppercase tracking-wider text-amber-400 font-bold block">
                      Evidência Coletada
                    </span>
                    <h4 className="font-mystery font-bold text-white text-sm sm:text-base">
                      {selectedHotspot.title}
                    </h4>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedHotspot(null)}
                  className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                >
                  Fechar
                </button>
              </div>

              <div className="p-5 space-y-4 text-xs sm:text-sm">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 leading-relaxed font-sans-app">
                  {selectedHotspot.inspectionText}
                </div>

                {(() => {
                  const clue = getClueForHotspot(selectedHotspot.clueId);
                  if (!clue) return null;

                  return (
                    <div className="space-y-2 pt-1 border-t border-slate-800">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Categoria Forense:</span>
                        <span className="font-mono-code font-bold text-amber-400">{clue.category}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Importância no Caso:</span>
                        <span className={`font-semibold ${clue.isKeyEvidence ? 'text-rose-400' : 'text-blue-400'}`}>
                          {clue.isKeyEvidence ? '★ Evidência Crucial' : 'Pista Circunstancial'}
                        </span>
                      </div>
                      <p className="text-xs text-amber-300/80 font-typewriter bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
                        Nota: {clue.relevanceNote}
                      </p>
                    </div>
                  );
                })()}

                {allCluesFound && onGoToAccuse ? (
                  <div className="space-y-2 pt-1">
                    <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Todas as provas foram encontradas! O Tribunal de Acusação está liberado.</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setSelectedHotspot(null)}
                        className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors cursor-pointer"
                      >
                        Continuar Vendo
                      </button>
                      <button
                        onClick={() => {
                          soundManager.playClick();
                          setSelectedHotspot(null);
                          onGoToAccuse();
                        }}
                        className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-red-600/30 cursor-pointer"
                      >
                        <Scale className="w-3.5 h-3.5" />
                        <span>Acusar Agora</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedHotspot(null)}
                    className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Registrar no Dossiê
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

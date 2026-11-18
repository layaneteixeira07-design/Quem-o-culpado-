import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Search, Users, Pin, BookOpen, Scale, Volume2, VolumeX, Award, HelpCircle, Lock } from 'lucide-react';
import { CaseDossier, GameplayTab, GameProgress, EvidenceConnection } from '../types/game';
import { SceneExplorer } from './SceneExplorer';
import { SuspectsInterrogation } from './SuspectsInterrogation';
import { CrimeBoard } from './CrimeBoard';
import { CaseDossierView } from './CaseDossierView';
import { AccusationForm } from './AccusationForm';
import { soundManager } from '../utils/audio';

interface GameplayScreenProps {
  caseDossier: CaseDossier;
  progress: GameProgress;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onBackToCases: () => void;
  onVerdictCompleted: (result: {
    isVictory: boolean;
    scoreGained: number;
    starsEarned: number;
    failureReason?: string;
  }) => void;
  onSaveProgress: (updater: (prev: GameProgress) => GameProgress) => void;
  onOpenInstructions?: () => void;
}

export const GameplayScreen: React.FC<GameplayScreenProps> = ({
  caseDossier,
  progress,
  soundEnabled,
  onToggleSound,
  onBackToCases,
  onVerdictCompleted,
  onSaveProgress,
  onOpenInstructions
}) => {
  const [activeTab, setActiveTab] = useState<GameplayTab>('scene');
  const [scorePopup, setScorePopup] = useState<number | null>(null);

  // Retrieve case-specific progress
  const discoveredClueIds = progress.discoveredClues[caseDossier.id] || [];
  const interrogatedQuestionIds = progress.interrogatedQuestions[caseDossier.id] || [];
  const exposedContradictionIds = progress.exposedContradictions[caseDossier.id] || [];
  const connections = progress.pinnedEvidence[caseDossier.id] || [];
  const canAccuse = discoveredClueIds.length >= caseDossier.clues.length;

  const triggerScorePopup = (pts: number) => {
    setScorePopup(pts);
    setTimeout(() => {
      setScorePopup(null);
    }, 1200);
  };

  const handleDiscoverClue = (clueId: string) => {
    if (discoveredClueIds.includes(clueId)) return;

    const clue = caseDossier.clues.find((c) => c.id === clueId);
    const pts = clue?.isKeyEvidence ? 150 : 100;
    triggerScorePopup(pts);

    onSaveProgress((prev) => ({
      ...prev,
      totalScore: prev.totalScore + pts,
      discoveredClues: {
        ...prev.discoveredClues,
        [caseDossier.id]: [...(prev.discoveredClues[caseDossier.id] || []), clueId]
      }
    }));
  };

  const handleAskQuestion = (questionId: string) => {
    if (interrogatedQuestionIds.includes(questionId)) return;

    onSaveProgress((prev) => ({
      ...prev,
      interrogatedQuestions: {
        ...prev.interrogatedQuestions,
        [caseDossier.id]: [...(prev.interrogatedQuestions[caseDossier.id] || []), questionId]
      }
    }));
  };

  const handleExposeContradiction = (questionId: string) => {
    if (exposedContradictionIds.includes(questionId)) return;

    triggerScorePopup(250);

    onSaveProgress((prev) => ({
      ...prev,
      totalScore: prev.totalScore + 250,
      exposedContradictions: {
        ...prev.exposedContradictions,
        [caseDossier.id]: [...(prev.exposedContradictions[caseDossier.id] || []), questionId]
      }
    }));
  };

  const handleToggleConnection = (suspectId: string, clueId: string) => {
    onSaveProgress((prev) => {
      const currentConns = prev.pinnedEvidence[caseDossier.id] || [];
      const exists = currentConns.some((c) => c.suspectId === suspectId && c.clueId === clueId);
      const nextConns = exists
        ? currentConns.filter((c) => !(c.suspectId === suspectId && c.clueId === clueId))
        : [...currentConns, { suspectId, clueId }];

      return {
        ...prev,
        pinnedEvidence: {
          ...prev.pinnedEvidence,
          [caseDossier.id]: nextConns
        }
      };
    });
  };

  const handleVerdictSubmit = (accusation: {
    suspectId: string;
    evidenceId: string;
    motiveId: string;
    methodId: string;
  }) => {
    const isCulpritCorrect = accusation.suspectId === caseDossier.culpritId;
    const isEvidenceCorrect = accusation.evidenceId === caseDossier.keyEvidenceId;
    const isMotiveCorrect = accusation.motiveId === caseDossier.trueMotiveId;
    const isMethodCorrect = accusation.methodId === caseDossier.trueMethodId;

    if (isCulpritCorrect && isEvidenceCorrect && isMotiveCorrect && isMethodCorrect) {
      // Complete Success!
      // Calculate Stars based on discovered clues & mistakes
      const allCluesFound = discoveredClueIds.length >= caseDossier.clues.length - 1;
      const contradictionsExposed = exposedContradictionIds.length >= 1;
      let stars = 1;
      if (contradictionsExposed) stars = 2;
      if (allCluesFound && contradictionsExposed) stars = 3;

      const baseScore = 1000;
      const starsBonus = stars * 150;
      const totalEarned = baseScore + starsBonus;

      onSaveProgress((prev) => {
        const nextScore = prev.totalScore + totalEarned;
        const nextCases = prev.casesCompleted.includes(caseDossier.id)
          ? prev.casesCompleted
          : [...prev.casesCompleted, caseDossier.id];

        const nextStars = {
          ...prev.caseStars,
          [caseDossier.id]: Math.max(prev.caseStars[caseDossier.id] || 0, stars)
        };

        // Determine title rank
        let title = prev.reputationTitle;
        if (nextScore >= 3500) title = 'Mestre da Dedução (Sherlock)';
        else if (nextScore >= 2000) title = 'Inspetor Chefe';
        else if (nextScore >= 800) title = 'Investigador Forense';

        return {
          ...prev,
          totalScore: nextScore,
          casesCompleted: nextCases,
          caseStars: nextStars,
          reputationTitle: title
        };
      });

      onVerdictCompleted({
        isVictory: true,
        scoreGained: totalEarned,
        starsEarned: stars
      });
    } else {
      // Rejection / Failure
      let reason = 'A acusação não se sustentou perante o tribunal.';
      if (!isCulpritCorrect) {
        const accused = caseDossier.suspects.find((s) => s.id === accusation.suspectId);
        reason = `Você acusou ${accused?.name || 'um inocente'}, porém ele possui um álibi verdadeiro e a investigação provou que não foi o autor do crime!`;
      } else if (!isEvidenceCorrect) {
        reason = 'Você identificou o suspeito correto, porém a evidência apresentada NÃO é a prova irrefutável necessária para quebrar seu álibi diante do juiz!';
      } else if (!isMotiveCorrect) {
        reason = 'A motivação selecionada não possui embasamento nos fatos colhidos. O réu conseguiu justificar suas intenções e foi liberado!';
      } else if (!isMethodCorrect) {
        reason = 'A reconstituição do método do crime apresentada na queixa continha erros graves e o juiz declarou nulidade processual!';
      }

      onSaveProgress((prev) => ({
        ...prev,
        mistakesCount: {
          ...prev.mistakesCount,
          [caseDossier.id]: (prev.mistakesCount[caseDossier.id] || 0) + 1
        }
      }));

      onVerdictCompleted({
        isVictory: false,
        scoreGained: 0,
        starsEarned: 0,
        failureReason: reason
      });
    }
  };

  const navItems: { id: GameplayTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: 'scene',
      label: 'Cenários',
      icon: <Search className="w-4 h-4" />
    },
    {
      id: 'suspects',
      label: 'Suspeitos',
      icon: <Users className="w-4 h-4" />,
      badge: exposedContradictionIds.length > 0 ? exposedContradictionIds.length : undefined
    },
    {
      id: 'board',
      label: 'Mural',
      icon: <Pin className="w-4 h-4" />,
      badge: connections.length > 0 ? connections.length : undefined
    },
    {
      id: 'dossier',
      label: 'Dossiê',
      icon: <BookOpen className="w-4 h-4" />
    },
    {
      id: 'accuse',
      label: 'Acusar',
      icon: canAccuse ? <Scale className="w-4 h-4" /> : <Lock className="w-4 h-4 text-slate-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col justify-between pb-20 sm:pb-6 select-none">
      {/* Top Navigation HUD */}
      <header className="sticky top-0 z-30 bg-[#070b14]/95 backdrop-blur-md border-b border-slate-800/80 px-3 sm:px-6 py-2.5 pt-safe flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 truncate">
          <button
            onClick={() => {
              soundManager.playClick();
              onBackToCases();
            }}
            className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center text-slate-400 hover:text-white active:scale-95 transition-all shrink-0"
            aria-label="Voltar aos casos"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="truncate">
            <span className="text-[10px] font-mono-code font-bold text-amber-400 uppercase tracking-wider block">
              {caseDossier.codeName}
            </span>
            <h1 className="text-xs sm:text-sm font-bold font-mystery text-white truncate">
              {caseDossier.title}
            </h1>
          </div>
        </div>

        {/* HUD Score & Pistas */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono-code text-xs font-bold tabular-nums">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>{progress.totalScore} pts</span>

            {/* Score popup notification */}
            <AnimatePresence>
              {scorePopup && (
                <motion.span
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: -20, scale: 1.1 }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-3 right-0 font-black text-xs text-amber-300 bg-amber-950 border border-amber-400 px-1.5 py-0.5 rounded shadow-lg pointer-events-none"
                >
                  +{scorePopup}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono-code text-slate-300">
            <Search className="w-3 h-3 text-slate-400" />
            <span>{discoveredClueIds.length}/{caseDossier.clues.length}</span>
          </div>

          {onOpenInstructions && (
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenInstructions();
              }}
              aria-label="Passo a Passo do Jogo"
              title="Passo a Passo & Dicas"
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-900 border border-slate-800 text-amber-400 hover:text-amber-300 hover:border-amber-500/40 cursor-pointer active:scale-95 transition-all"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => {
              onToggleSound();
              soundManager.playClick();
            }}
            aria-label={soundEnabled ? 'Desativar som' : 'Ativar som'}
            className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-900 border border-slate-800 text-slate-400 hover:text-white cursor-pointer active:scale-95 transition-all"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-600" />}
          </button>
        </div>
      </header>

      {/* Desktop Horizontal Mode Selector */}
      <div className="hidden sm:flex max-w-4xl w-full mx-auto px-4 pt-4">
        <div className="w-full flex items-center gap-1 p-1 bg-slate-900/90 border border-slate-800 rounded-xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                soundManager.playClick();
                setActiveTab(item.id);
              }}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === item.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.badge !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeTab === item.id ? 'bg-slate-950 text-amber-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-3 sm:p-4 mt-2">
        {activeTab === 'scene' && (
          <SceneExplorer
            scenes={caseDossier.scenes}
            clues={caseDossier.clues}
            discoveredClueIds={discoveredClueIds}
            onDiscoverClue={handleDiscoverClue}
            onGoToAccuse={() => setActiveTab('accuse')}
            onGoToSuspects={() => setActiveTab('suspects')}
          />
        )}

        {activeTab === 'suspects' && (
          <SuspectsInterrogation
            suspects={caseDossier.suspects}
            clues={caseDossier.clues}
            discoveredClueIds={discoveredClueIds}
            interrogatedQuestionIds={interrogatedQuestionIds}
            exposedContradictionIds={exposedContradictionIds}
            onAskQuestion={handleAskQuestion}
            onExposeContradiction={handleExposeContradiction}
          />
        )}

        {activeTab === 'board' && (
          <CrimeBoard
            suspects={caseDossier.suspects}
            clues={caseDossier.clues}
            discoveredClueIds={discoveredClueIds}
            connections={connections}
            exposedContradictionIds={exposedContradictionIds}
            onToggleConnection={handleToggleConnection}
          />
        )}

        {activeTab === 'dossier' && (
          <CaseDossierView
            caseDossier={caseDossier}
            discoveredClueIds={discoveredClueIds}
            interrogatedQuestionIds={interrogatedQuestionIds}
            exposedContradictionIds={exposedContradictionIds}
          />
        )}

        {activeTab === 'accuse' && (
          <AccusationForm
            caseDossier={caseDossier}
            discoveredClueIds={discoveredClueIds}
            onGoToScenes={() => setActiveTab('scene')}
            onVerdictSubmit={handleVerdictSubmit}
          />
        )}
      </main>

      {/* Mobile Ergonomic Bottom Tab Bar (thumb-zone optimized) */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#070b14]/95 backdrop-blur-md border-t border-slate-800 pb-safe">
        <div className="grid grid-cols-5 items-center h-16 px-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab(item.id);
                }}
                className={`relative flex flex-col items-center justify-center h-full active:scale-95 transition-transform ${
                  isActive ? 'text-amber-400' : 'text-slate-400'
                }`}
              >
                <div className={`p-1 rounded-lg ${isActive ? 'bg-amber-500/15' : ''}`}>
                  {item.icon}
                </div>
                <span className="text-[10px] font-medium tracking-tight mt-0.5">
                  {item.label}
                </span>

                {item.badge !== undefined && (
                  <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-bold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

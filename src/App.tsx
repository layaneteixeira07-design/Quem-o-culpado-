/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveScreen, CaseDossier, GameProgress } from './types/game';
import { CASES_DATA } from './data/cases';
import { HomeScreen } from './components/HomeScreen';
import { CaseSelectScreen } from './components/CaseSelectScreen';
import { CaseBriefingModal } from './components/CaseBriefingModal';
import { GameplayScreen } from './components/GameplayScreen';
import { VerdictScreen } from './components/VerdictScreen';
import { InstructionsModal } from './components/InstructionsModal';
import { SettingsModal } from './components/SettingsModal';
import { soundManager } from './utils/audio';

const INITIAL_PROGRESS: GameProgress = {
  totalScore: 0,
  casesCompleted: [],
  caseStars: {},
  reputationTitle: 'Detetive Aprendiz',
  discoveredClues: {},
  interrogatedQuestions: {},
  exposedContradictions: {},
  pinnedEvidence: {},
  mistakesCount: {}
};

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('home');
  const [selectedCase, setSelectedCase] = useState<CaseDossier>(CASES_DATA[0]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [verdictResult, setVerdictResult] = useState<{
    isVictory: boolean;
    scoreGained: number;
    starsEarned: number;
    failureReason?: string;
  } | null>(null);

  const [progress, setProgress] = useState<GameProgress>(() => {
    if (typeof window === 'undefined') return INITIAL_PROGRESS;
    try {
      const saved = localStorage.getItem('quem_e_o_culpado_progress');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return INITIAL_PROGRESS;
  });

  // Keep progress synced to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('quem_e_o_culpado_progress', JSON.stringify(progress));
    } catch {
      // Ignore storage errors
    }
  }, [progress]);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundManager.setSoundEnabled(next);
  };

  const handleStartPlaying = () => {
    // If there's an in-progress or next unsolved case, pick it; otherwise open case select
    const nextUnsolved = CASES_DATA.find((c) => !progress.casesCompleted.includes(c.id));
    const caseToPlay = nextUnsolved || CASES_DATA[0];
    setSelectedCase(caseToPlay);
    setActiveScreen('briefing');
  };

  const handleSelectCase = (caseDossier: CaseDossier) => {
    setSelectedCase(caseDossier);
    setActiveScreen('briefing');
  };

  const handleStartInvestigation = () => {
    setActiveScreen('gameplay');
  };

  const handleVerdictCompleted = (result: {
    isVictory: boolean;
    scoreGained: number;
    starsEarned: number;
    failureReason?: string;
  }) => {
    setVerdictResult(result);
    setActiveScreen('verdict');
  };

  const handleNextCase = () => {
    const currentIndex = CASES_DATA.findIndex((c) => c.id === selectedCase.id);
    if (currentIndex >= 0 && currentIndex < CASES_DATA.length - 1) {
      const nextCase = CASES_DATA[currentIndex + 1];
      setSelectedCase(nextCase);
      setActiveScreen('briefing');
      setVerdictResult(null);
    } else {
      setActiveScreen('case_select');
      setVerdictResult(null);
    }
  };

  const handleRetry = () => {
    setActiveScreen('gameplay');
    setVerdictResult(null);
  };

  const handleGoHome = () => {
    setActiveScreen('home');
    setVerdictResult(null);
  };

  const handleResetProgress = () => {
    localStorage.removeItem('quem_e_o_culpado_progress');
    setProgress(INITIAL_PROGRESS);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans-app">
      {activeScreen === 'home' && (
        <HomeScreen
          progress={progress}
          onStartPlaying={handleStartPlaying}
          onOpenCaseSelect={() => setActiveScreen('case_select')}
          onOpenInstructions={() => setShowInstructions(true)}
          onOpenSettings={() => setShowSettings(true)}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
        />
      )}

      {activeScreen === 'case_select' && (
        <CaseSelectScreen
          progress={progress}
          onSelectCase={handleSelectCase}
          onBack={() => setActiveScreen('home')}
        />
      )}

      {activeScreen === 'briefing' && (
        <CaseBriefingModal
          caseDossier={selectedCase}
          onStartInvestigation={handleStartInvestigation}
          onBack={() => setActiveScreen('case_select')}
        />
      )}

      {activeScreen === 'gameplay' && (
        <GameplayScreen
          caseDossier={selectedCase}
          progress={progress}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
          onBackToCases={() => setActiveScreen('case_select')}
          onVerdictCompleted={handleVerdictCompleted}
          onSaveProgress={setProgress}
          onOpenInstructions={() => setShowInstructions(true)}
        />
      )}

      {activeScreen === 'verdict' && verdictResult && (
        <VerdictScreen
          caseDossier={selectedCase}
          isVictory={verdictResult.isVictory}
          scoreGained={verdictResult.scoreGained}
          starsEarned={verdictResult.starsEarned}
          failureReason={verdictResult.failureReason}
          progress={progress}
          onNextCase={
            CASES_DATA.findIndex((c) => c.id === selectedCase.id) < CASES_DATA.length - 1
              ? handleNextCase
              : undefined
          }
          onRetry={handleRetry}
          onGoHome={handleGoHome}
        />
      )}

      {/* Global Modals */}
      {showInstructions && (
        <InstructionsModal onClose={() => setShowInstructions(false)} />
      )}

      {showSettings && (
        <SettingsModal
          onClose={() => setShowSettings(false)}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
          onResetProgress={handleResetProgress}
        />
      )}
    </div>
  );
}

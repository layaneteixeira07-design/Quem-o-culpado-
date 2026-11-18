export type DifficultyLevel = 'Fácil' | 'Médio' | 'Difícil' | 'Mestre';

export interface Question {
  id: string;
  question: string;
  answer: string;
  isLie: boolean;
  contradictedByClueId?: string;
  revealNotes?: string;
}

export interface Suspect {
  id: string;
  name: string;
  role: string;
  age: number;
  avatarBg: string;
  avatarIcon: string;
  gender: 'M' | 'F';
  bio: string;
  alibi: string;
  initialMotive: string;
  nervousness: number; // 0 to 100
  isCulprit: boolean;
  questions: Question[];
}

export interface Hotspot {
  id: string;
  title: string;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  clueId: string;
  inspectionText: string;
  hintText: string;
}

export interface Scene {
  id: string;
  name: string;
  description: string;
  ambientTone: string;
  icon: string;
  hotspots: Hotspot[];
}

export interface Clue {
  id: string;
  title: string;
  category: 'Forense' | 'Documento' | 'Testemunho' | 'Objeto Pessoal';
  description: string;
  sceneName: string;
  iconName: string;
  isKeyEvidence: boolean;
  relevanceNote: string;
}

export interface CaseDossier {
  id: string;
  title: string;
  codeName: string;
  difficulty: DifficultyLevel;
  estimatedTime: string;
  crimeType: string;
  location: string;
  timestamp: string;
  synopsis: string;
  detectiveNotes: string;
  scenes: Scene[];
  suspects: Suspect[];
  clues: Clue[];
  culpritId: string;
  keyEvidenceId: string;
  trueMotiveId: string;
  motiveOptions: { id: string; label: string; isCorrect: boolean }[];
  trueMethodId: string;
  methodOptions: { id: string; label: string; isCorrect: boolean }[];
  solutionSummary: {
    confession: string;
    breakdown: string;
    howEvidenceProvedIt: string;
  };
  unlockPointsRequired: number;
}

export interface EvidenceConnection {
  suspectId: string;
  clueId: string;
  note?: string;
}

export interface GameProgress {
  totalScore: number;
  casesCompleted: string[];
  caseStars: Record<string, number>; // caseId -> 1 to 3 stars
  reputationTitle: string; // e.g. "Inspetor Chefe", "Sherlock Holmes"
  discoveredClues: Record<string, string[]>; // caseId -> clueIds[]
  interrogatedQuestions: Record<string, string[]>; // caseId -> questionIds[]
  exposedContradictions: Record<string, string[]>; // caseId -> questionIds[]
  pinnedEvidence: Record<string, EvidenceConnection[]>; // caseId -> connections
  mistakesCount: Record<string, number>; // caseId -> mistakes
}

export type ActiveScreen = 'home' | 'case_select' | 'briefing' | 'gameplay' | 'verdict' | 'instructions' | 'settings';
export type GameplayTab = 'scene' | 'suspects' | 'board' | 'dossier' | 'accuse';

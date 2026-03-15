// src/app/models/tournament.model.ts

export type PlayerName = 'Mike' | 'Greg' | 'Jason';

export interface Player {
  name: PlayerName;
  points: number;
  consecutiveThirds: number; 
  currentRoll: number | null;
}

export interface GameRecord {
  id: string; // Unique ID for the match
  gameName: string;
  rules: string;      // The specific rules used for this instance
  timestamp: number; 
  winner: PlayerName;
  secondPlace: PlayerName;
  thirdPlace: PlayerName;
}

export interface TournamentState {
  targetNumber: number | null;
  phase: 'idle' | 'selecting-game' | 'rolling' | 'playing' | 'tiebreaker';
}
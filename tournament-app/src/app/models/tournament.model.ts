// src/app/models/tournament.model.ts

export type PlayerName = 'Mike' | 'Greg' | 'Jason';

export interface Player {
  name: PlayerName;
  points: number;
  consecutiveThirds: number; // For the Dookie Dab tracker
  currentRoll: number | null;
}
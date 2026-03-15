import { Injectable } from '@angular/core';
import { Player, PlayerName, GameRecord } from '../models/tournament.model';
import { HALL_OF_RECORDS_SEED } from '../data/hall-of-records';
import { LifetimeRecord } from '../models/tournament.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly PLAYERS_KEY = 'mario_party_players';
  private readonly HISTORY_KEY = 'mario_party_history';
  private readonly LIFETIME_KEY = 'mario_party_lifetime'; // NEW!

  // --- PLAYERS ---
  savePlayers(players: Record<PlayerName, Player>) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.PLAYERS_KEY, JSON.stringify(players));
    }
  }

  loadPlayers(): Record<PlayerName, Player> | null {
    if (typeof localStorage !== 'undefined') {
      const data = localStorage.getItem(this.PLAYERS_KEY);
      return data ? JSON.parse(data) : null;
    }
    return null; // Return null if on the server
  }

  // --- HISTORY ---
  saveHistory(history: GameRecord[]) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.HISTORY_KEY, JSON.stringify(history));
    }
  }

  loadHistory(): GameRecord[] {
    if (typeof localStorage !== 'undefined') {
      const data = localStorage.getItem(this.HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    }
    return []; // Return empty array if on the server
  }

  // --- NUKE IT ---
  clearTournament() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.PLAYERS_KEY);
      localStorage.removeItem(this.HISTORY_KEY);
    }
  }

  // --- LIFETIME STATS ---
  saveLifetimeStats(stats: LifetimeRecord[]) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.LIFETIME_KEY, JSON.stringify(stats));
    }
  }

  loadLifetimeStats(): LifetimeRecord[] {
    if (typeof localStorage !== 'undefined') {
      const data = localStorage.getItem(this.LIFETIME_KEY);
      // If it exists, return it. If not, return our massive seed file!
      return data ? JSON.parse(data) : [...HALL_OF_RECORDS_SEED]; 
    }
    return [...HALL_OF_RECORDS_SEED];
  }
}

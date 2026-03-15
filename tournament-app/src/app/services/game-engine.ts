import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Player, PlayerName, TournamentState, GameRecord } from '../models/tournament.model';
import { StorageService } from './storage';

@Injectable({
  providedIn: 'root'
})
export class GameEngineService {
  // Default fresh state
  private playersData: Record<PlayerName, Player> = {
    'Mike': { name: 'Mike', points: 0, consecutiveThirds: 0, currentRoll: null },
    'Greg': { name: 'Greg', points: 0, consecutiveThirds: 0, currentRoll: null },
    'Jason': { name: 'Jason', points: 0, consecutiveThirds: 0, currentRoll: null }
  };

  private matchHistory: GameRecord[] = [];

  // Broadcasters
  public players$ = new BehaviorSubject<Record<PlayerName, Player>>(this.playersData);
  public history$ = new BehaviorSubject<GameRecord[]>(this.matchHistory);
  
  private stateData: TournamentState = { targetNumber: null, phase: 'idle' };
  public gameState$ = new BehaviorSubject<TournamentState>(this.stateData);
  public dookieDabAlert$ = new BehaviorSubject<PlayerName | null>(null);

  constructor(private storage: StorageService) {
    // 1. Boot-up Check: Is there a game in progress saved in the browser?
    const savedPlayers = this.storage.loadPlayers();
    const savedHistory = this.storage.loadHistory();

    if (savedPlayers) {
      this.playersData = savedPlayers;
      this.players$.next(this.playersData);
    }
    if (savedHistory.length > 0) {
      this.matchHistory = savedHistory;
      this.history$.next(this.matchHistory);
    }
  }

  // UPDATED: Now takes gameName and rules to create a formal record!
  commitGameResults(gameName: string, rules: string, winner: PlayerName, secondPlace: PlayerName, thirdPlace: PlayerName) {
    let currentPlayers = {
      'Mike': { ...this.playersData['Mike'] },
      'Greg': { ...this.playersData['Greg'] },
      'Jason': { ...this.playersData['Jason'] }
    };

    currentPlayers[winner].points += 1;
    currentPlayers[winner].consecutiveThirds = 0;
    currentPlayers[secondPlace].consecutiveThirds = 0;
    currentPlayers[thirdPlace].consecutiveThirds += 1;

    if (currentPlayers[thirdPlace].consecutiveThirds === 3) {
      this.dookieDabAlert$.next(thirdPlace);
      currentPlayers[thirdPlace].consecutiveThirds = 1; 
    }

    // 2. Create the Game Record
    const newRecord: GameRecord = {
      id: Math.random().toString(36).substring(2, 9), // Quick random ID
      gameName,
      rules,
      timestamp: Date.now(),
      winner,
      secondPlace,
      thirdPlace
    };

    this.matchHistory.push(newRecord);

    // 3. Save everything to LocalStorage!
    this.storage.savePlayers(currentPlayers);
    this.storage.saveHistory(this.matchHistory);

    // 4. Broadcast the updates
    this.playersData = currentPlayers;
    this.players$.next(this.playersData);
    this.history$.next(this.matchHistory);
    
    this.setPhase('selecting-game');
  }

  setPhase(newPhase: TournamentState['phase']) {
    this.stateData.phase = newPhase;
    this.gameState$.next(this.stateData);
  }

  clearDookieDab() {
    this.dookieDabAlert$.next(null);
  }
  // ☢️ THE NUKE METHOD
  resetTournament() {
    // 1. Wipe the local storage
    this.storage.clearTournament();

    // 2. Reset the local variables back to zero
    this.playersData = {
      'Mike': { name: 'Mike', points: 0, consecutiveThirds: 0, currentRoll: null },
      'Greg': { name: 'Greg', points: 0, consecutiveThirds: 0, currentRoll: null },
      'Jason': { name: 'Jason', points: 0, consecutiveThirds: 0, currentRoll: null }
    };
    this.matchHistory = [];

    // 3. Broadcast the empty state to the UI
    this.players$.next(this.playersData);
    this.history$.next(this.matchHistory);
    this.setPhase('selecting-game');
    this.clearDookieDab();
  }

}
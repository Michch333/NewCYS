import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Player, PlayerName, TournamentState } from '../models/tournament.model';

@Injectable({
  providedIn: 'root'
})
export class GameEngineService {
  // 1. The Initial State of the Players
  private playersData: Record<PlayerName, Player> = {
    'Mike': { name: 'Mike', points: 0, consecutiveThirds: 0, currentRoll: null },
    'Greg': { name: 'Greg', points: 0, consecutiveThirds: 0, currentRoll: null },
    'Jason': { name: 'Jason', points: 0, consecutiveThirds: 0, currentRoll: null }
  };

  // 2. The Broadcasters (Components will listen to these)
  public players$ = new BehaviorSubject<Record<PlayerName, Player>>(this.playersData);
  
  private stateData: TournamentState = { targetNumber: null, phase: 'idle' };
  public gameState$ = new BehaviorSubject<TournamentState>(this.stateData);

  constructor() {}

  commitGameResults(winner: PlayerName, secondPlace: PlayerName, thirdPlace: PlayerName) {
    // Deep copy: Create fresh objects for each player so Angular knows they actually changed!
    let currentPlayers = {
      'Mike': { ...this.playersData['Mike'] },
      'Greg': { ...this.playersData['Greg'] },
      'Jason': { ...this.playersData['Jason'] }
    };

    // Winner gets a point and their dookie threat resets
    currentPlayers[winner].points += 1;
    currentPlayers[winner].consecutiveThirds = 0;

    // Second place just escapes the dookie threat
    currentPlayers[secondPlace].consecutiveThirds = 0;

    // Third place gets a strike!
    currentPlayers[thirdPlace].consecutiveThirds += 1;

    // Check for the Dookie Dab
    if (currentPlayers[thirdPlace].consecutiveThirds === 3) {
      console.log(`🚨 DOOKIE DAB ALERT FOR ${thirdPlace.toUpperCase()}! 🚨`);
      // Reset back to 1 as per house rules
      currentPlayers[thirdPlace].consecutiveThirds = 1; 
    }

    // Broadcast the new objects to the UI
    this.playersData = currentPlayers;
    this.players$.next(this.playersData);
    
    // Move the game phase back to selecting the next game
    this.setPhase('selecting-game');
  }

  // Helper method to change the phase of the center console
  setPhase(newPhase: TournamentState['phase']) {
    this.stateData.phase = newPhase;
    this.gameState$.next(this.stateData);
  }
}
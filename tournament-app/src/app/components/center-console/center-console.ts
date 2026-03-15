import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { GameEngineService } from '../../services/game-engine'; 
import { PlayerName, TournamentState, GameRecord, LifetimeRecord } from '../../models/tournament.model';

@Component({
  selector: 'app-center-console',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './center-console.html',
  styleUrl: './center-console.scss'
})
export class CenterConsoleComponent implements OnInit {
  currentState!: TournamentState;
  
  matchHistory: GameRecord[] = [];
  viewingHistory: boolean = false; 
  sortedLifetimeStats: LifetimeRecord[] = [];
  
  // NEW: The currently viewed scouting report
  selectedGameStats: LifetimeRecord | null = null;
  
  gameName: string = '';
  gameRules: string = '';
  firstPlace: PlayerName | '' = '';
  secondPlace: PlayerName | '' = '';
  thirdPlace: PlayerName | '' = '';
  playerList: PlayerName[] = ['Mike', 'Greg', 'Jason'];

  constructor(private gameEngine: GameEngineService) {}

  ngOnInit() {
    this.gameEngine.gameState$.subscribe(state => this.currentState = state);
    this.gameEngine.history$.subscribe(history => this.matchHistory = history);
    this.gameEngine.lifetimeStats$.subscribe(stats => {
      this.sortedLifetimeStats = [...stats].sort((a, b) => a.gameName.localeCompare(b.gameName));
    });
    
    this.gameEngine.setPhase('selecting-game');
  }

  // UPDATED: Now saves the stats so we can display them!
  loadHistoricalGame(indexStr: string) {
    if (!indexStr) {
      this.selectedGameStats = null; // Clear if they unselect
      return; 
    }
    
    const index = parseInt(indexStr, 10);
    const selectedRecord = this.sortedLifetimeStats[index];
    
    this.gameName = selectedRecord.gameName;
    this.gameRules = selectedRecord.rules;
    this.selectedGameStats = selectedRecord; // <-- Save the stats for the UI
  }

  // NEW: Clear the stats card if someone manually edits the text boxes
  onManualInputChange() {
    this.selectedGameStats = null;
  }

  toggleHistory() {
    this.viewingHistory = !this.viewingHistory;
  }

  startGame() {
    if (this.gameName.trim() === '') {
      alert('Please enter a game name first!');
      return;
    }
    this.gameEngine.setPhase('playing');
  }

  // NEW: Smart Swap and Auto-Fill Logic
  onPlayerSelected(changedPosition: 'first' | 'second' | 'third', newPlayer: PlayerName | '') {
    if (!newPlayer) return;

    // 1. Swap Logic: If they were already in another position, clear that old position
    if (changedPosition !== 'first' && this.firstPlace === newPlayer) this.firstPlace = '';
    if (changedPosition !== 'second' && this.secondPlace === newPlayer) this.secondPlace = '';
    if (changedPosition !== 'third' && this.thirdPlace === newPlayer) this.thirdPlace = '';

    // 2. Auto-Fill Logic: See exactly who has been assigned
    const assignedPlayers = [this.firstPlace, this.secondPlace, this.thirdPlace].filter(p => p !== '');

    // If exactly 2 players are locked in, find the missing 3rd and assign them!
    if (assignedPlayers.length === 2) {
      const remainingPlayer = this.playerList.find(p => !assignedPlayers.includes(p)) as PlayerName | '';
      
      if (!this.firstPlace) this.firstPlace = remainingPlayer;
      else if (!this.secondPlace) this.secondPlace = remainingPlayer;
      else if (!this.thirdPlace) this.thirdPlace = remainingPlayer;
    }
  }

  submitResults() {
    if (!this.firstPlace || !this.secondPlace || !this.thirdPlace) {
      alert('Please select a player for all three positions!');
      return;
    }
    
    const uniquePlayers = new Set([this.firstPlace, this.secondPlace, this.thirdPlace]);
    if (uniquePlayers.size !== 3) {
      alert('A player cannot finish in multiple places!');
      return;
    }

    this.gameEngine.commitGameResults(this.gameName, this.gameRules, this.firstPlace, this.secondPlace, this.thirdPlace);
    
    // Clear everything for the next round
    this.gameName = '';
    this.gameRules = '';
    this.firstPlace = '';
    this.secondPlace = '';
    this.thirdPlace = '';
    this.selectedGameStats = null; // <-- Clear the stats card
  }
}
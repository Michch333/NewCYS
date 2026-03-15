import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { GameEngineService } from '../../services/game-engine'; 
import { PlayerName, TournamentState, GameRecord, LifetimeRecord } from '../../models/tournament.model'; // Added LifetimeRecord

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

  // NEW: Store the sorted historical games for the dropdown
  sortedLifetimeStats: LifetimeRecord[] = [];
  
  gameName: string = '';
  gameRules: string = '';
  firstPlace: PlayerName | '' = '';
  secondPlace: PlayerName | '' = '';
  thirdPlace: PlayerName | '' = '';
  playerList: PlayerName[] = ['Mike', 'Greg', 'Jason'];

  constructor(private gameEngine: GameEngineService) {}

  ngOnInit() {
    this.gameEngine.gameState$.subscribe(state => {
      this.currentState = state;
    });

    this.gameEngine.history$.subscribe(history => {
      this.matchHistory = history;
    });

    // NEW: Grab the lifetime stats, clone the array, and sort them alphabetically!
    this.gameEngine.lifetimeStats$.subscribe(stats => {
      this.sortedLifetimeStats = [...stats].sort((a, b) => a.gameName.localeCompare(b.gameName));
    });
    
    this.gameEngine.setPhase('selecting-game');
  }

  // NEW: Auto-fill function when you select from the dropdown
  loadHistoricalGame(indexStr: string) {
    if (!indexStr) return; // Ignore if they select the placeholder
    
    const index = parseInt(indexStr, 10);
    const selectedRecord = this.sortedLifetimeStats[index];
    
    // Auto-fill the text boxes
    this.gameName = selectedRecord.gameName;
    this.gameRules = selectedRecord.rules;
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
    
    this.gameName = '';
    this.gameRules = '';
    this.firstPlace = '';
    this.secondPlace = '';
    this.thirdPlace = '';
  }
}
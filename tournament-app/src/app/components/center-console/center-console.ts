import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { GameEngineService } from '../../services/game-engine'; 
import { PlayerName, TournamentState, GameRecord } from '../../models/tournament.model'; // Added GameRecord

@Component({
  selector: 'app-center-console',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './center-console.html',
  styleUrl: './center-console.scss'
})
export class CenterConsoleComponent implements OnInit {
  currentState!: TournamentState;
  
  // NEW: History State
  matchHistory: GameRecord[] = [];
  viewingHistory: boolean = false; 
  
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

    // NEW: Subscribe to the history feed
    this.gameEngine.history$.subscribe(history => {
      this.matchHistory = history;
    });
    
    this.gameEngine.setPhase('selecting-game');
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

    // UPDATED: Now passing the game name and rules to the engine!
    this.gameEngine.commitGameResults(this.gameName, this.gameRules, this.firstPlace, this.secondPlace, this.thirdPlace);
    
    this.gameName = '';
    this.gameRules = '';
    this.firstPlace = '';
    this.secondPlace = '';
    this.thirdPlace = '';
  }
}
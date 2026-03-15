import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- We need this for inputs/dropdowns!
import { GameEngineService } from '../../services/game-engine'; // (Check your path)
import { PlayerName, TournamentState } from '../../models/tournament.model';

@Component({
  selector: 'app-center-console',
  standalone: true,
  imports: [CommonModule, FormsModule], // <-- Add FormsModule here
  templateUrl: './center-console.html',
  styleUrl: './center-console.scss'
})
export class CenterConsoleComponent implements OnInit {
  // Listen to the current state of the app
  currentState!: TournamentState;
  
  // Game Info
  gameName: string = '';
  gameRules: string = '';

  // Match Results
  firstPlace: PlayerName | '' = '';
  secondPlace: PlayerName | '' = '';
  thirdPlace: PlayerName | '' = '';

  // A handy array for our dropdown menus
  playerList: PlayerName[] = ['Mike', 'Greg', 'Jason'];

  constructor(private gameEngine: GameEngineService) {}

  ngOnInit() {
    this.gameEngine.gameState$.subscribe(state => {
      this.currentState = state;
    });
    
    // Force the app into the selection phase on load
    this.gameEngine.setPhase('selecting-game');
  }

  // Transitions from selection to playing
  startGame() {
    if (this.gameName.trim() === '') {
      alert('Please enter a game name first!');
      return;
    }
    this.gameEngine.setPhase('playing');
  }

  // Commits the results and resets the board
  submitResults() {
    if (!this.firstPlace || !this.secondPlace || !this.thirdPlace) {
      alert('Please select a player for all three positions!');
      return;
    }
    
    // Make sure no one is selected twice (basic validation)
    const uniquePlayers = new Set([this.firstPlace, this.secondPlace, this.thirdPlace]);
    if (uniquePlayers.size !== 3) {
      alert('A player cannot finish in multiple places!');
      return;
    }

    // Send the results to the engine!
    this.gameEngine.commitGameResults(this.firstPlace, this.secondPlace, this.thirdPlace);
    
    // Clear the local form for the next game
    this.gameName = '';
    this.gameRules = '';
    this.firstPlace = '';
    this.secondPlace = '';
    this.thirdPlace = '';
  }
}
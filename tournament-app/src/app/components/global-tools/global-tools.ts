import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameEngineService } from '../../services/game-engine'; // Make sure the path matches!

@Component({
  selector: 'app-global-tools',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './global-tools.html',
  styleUrl: './global-tools.scss'     
})
export class GlobalToolsComponent {
  currentRoll: number | null = null;
  turnOrder: string[] = [];

  // Inject the engine here
  constructor(private gameEngine: GameEngineService) {}

  rollD60() {
    this.currentRoll = Math.floor(Math.random() * 60) + 1;
  }

  randomizeOrder() {
    const players = ['Mike', 'Greg', 'Jason'];
    for (let i = players.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [players[i], players[j]] = [players[j], players[i]];
    }
    this.turnOrder = players;
  }

  // The confirmation wrapper
  nukeTournament() {
    if (confirm('🚨 ARE YOU SURE? This will permanently delete all scores and game history!')) {
      this.gameEngine.resetTournament();
      this.currentRoll = null; // Clear the dice
      this.turnOrder = [];     // Clear the turn order
    }
  }
}
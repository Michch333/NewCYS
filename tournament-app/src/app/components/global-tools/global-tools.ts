import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-global-tools',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './global-tools.html', // (Make sure this matches your exact file name!)
  styleUrl: './global-tools.scss'     // (Make sure this matches your exact file name!)
})
export class GlobalToolsComponent {
  currentRoll: number | null = null;
  turnOrder: string[] = [];

  // 1. Roll a random number between 1 and 60
  rollD60() {
    this.currentRoll = Math.floor(Math.random() * 60) + 1;
  }

  // 2. Randomly shuffle the players for turn order
  randomizeOrder() {
    const players = ['Mike', 'Greg', 'Jason'];
    
    // A standard Fisher-Yates shuffle to mix up the array
    for (let i = players.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [players[i], players[j]] = [players[j], players[i]];
    }
    
    this.turnOrder = players;
  }
}
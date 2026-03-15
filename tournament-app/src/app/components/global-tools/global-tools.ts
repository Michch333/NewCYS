import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameEngineService } from '../../services/game-engine';
import { LifetimeRecord } from '../../models/tournament.model';

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

  exportCSV() {
    // 1. Get the latest stats from the engine
    const stats: LifetimeRecord[] = this.gameEngine.lifetimeStats$.getValue();
    
    // 2. Build the CSV Header
    let csvContent = "Game Name,Rules,Current Champ,Jason Wins,Mike Wins,Greg Wins,Times Played\n";
    
    // 3. Loop through the records and build the rows
    stats.forEach(record => {
      // Escape commas in game names or rules
      const safeGameName = `"${record.gameName.replace(/"/g, '""')}"`;
      const safeRules = `"${record.rules.replace(/"/g, '""')}"`;
      csvContent += `${safeGameName},${safeRules},${record.currentChamp},${record.jasonWins},${record.mikeWins},${record.gregWins},${record.timesPlayed}\n`;
    });

    // 4. Trigger the download automatically!
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'Updated_Hall_Of_Records.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
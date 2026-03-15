import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerCardComponent } from './components/player-card/player-card'; 
import { Player, PlayerName } from './models/tournament.model';
import { GameEngineService } from './services/game-engine';
import { DookieDabModalComponent } from './components/dookie-dab-modal/dookie-dab-modal';
import { GlobalToolsComponent } from './components/global-tools/global-tools';
import { CenterConsoleComponent } from './components/center-console/center-console';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PlayerCardComponent, DookieDabModalComponent, GlobalToolsComponent, CenterConsoleComponent], 
  templateUrl: './app.html', 
  styleUrl: './app.scss'     
})
export class AppComponent implements OnInit {
  // 1. All class variables go at the top
  mike!: Player;
  greg!: Player;
  jason!: Player;
  activeVictim: PlayerName | null = null;

  // 2. Constructor
  constructor(private gameEngine: GameEngineService) {}

  // 3. Lifecycle hooks
  ngOnInit() {
    this.gameEngine.players$.subscribe(playersData => {
      this.mike = playersData['Mike'];
      this.greg = playersData['Greg'];
      this.jason = playersData['Jason'];
    });

    // Listen for the alarm bell!
    this.gameEngine.dookieDabAlert$.subscribe(victim => {
      this.activeVictim = victim;
    });
  }

  // 4. Custom Methods
  dismissDookieModal() {
    this.gameEngine.clearDookieDab();
  }
}
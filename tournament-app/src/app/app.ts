import { Component, OnInit } from '@angular/core';
import { PlayerCardComponent } from './components/player-card/player-card'; // (Check your path if needed!)
import { Player } from './models/tournament.model';
import { GameEngineService } from './services/game-engine'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PlayerCardComponent], 
  templateUrl: './app.html', 
  styleUrl: './app.scss'     
})
export class AppComponent implements OnInit {
  mike!: Player;
  greg!: Player;
  jason!: Player;

  constructor(private gameEngine: GameEngineService) {}

  ngOnInit() {
    // This should fire immediately when the app loads, and every time a score changes
    this.gameEngine.players$.subscribe(playersData => {
      console.log('📡 UI received updated players:', playersData);
      this.mike = playersData['Mike'];
      this.greg = playersData['Greg'];
      this.jason = playersData['Jason'];
    });
  }

  testSimulateGame() {
    console.log('🔘 Button was clicked!');
    this.gameEngine.commitGameResults('Mike', 'Greg', 'Jason');
  }
}
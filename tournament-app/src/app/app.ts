import { Component } from '@angular/core';
import { PlayerCardComponent } from './components/player-card/player-card';
import { Player } from './models/tournament.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PlayerCardComponent], // This tells Angular we are using the player cards!
  templateUrl: './app.html', // Make sure this matches your HTML file name
  styleUrl: './app.scss'     // Make sure this matches your SCSS file name
})
export class AppComponent {
  // Define our starting player states
  mike: Player = { name: 'Mike', points: 0, consecutiveThirds: 0, currentRoll: null };
  greg: Player = { name: 'Greg', points: 0, consecutiveThirds: 0, currentRoll: null };
  jason: Player = { name: 'Jason', points: 0, consecutiveThirds: 0, currentRoll: null };
}
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from '../../models/tournament.model';

@Component({
  selector: 'app-player-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-card.html',
  styleUrl: './player-card.scss'
})
export class PlayerCardComponent {
  // The exclamation mark tells TypeScript we promise this will be provided by the parent
  @Input() player!: Player; 
}
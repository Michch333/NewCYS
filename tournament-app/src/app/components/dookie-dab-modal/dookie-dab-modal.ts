import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- 1. Import CommonModule
import { PlayerName } from '../../models/tournament.model';

@Component({
  selector: 'app-dookie-dab-modal',
  standalone: true,
  imports: [CommonModule], // <-- 2. Add it to the imports array here!
  templateUrl: './dookie-dab-modal.html', 
  styleUrl: './dookie-dab-modal.scss'
})
export class DookieDabModalComponent {
  @Input() victim!: PlayerName;
  @Output() acknowledge = new EventEmitter<void>();

  closeModal() {
    this.acknowledge.emit();
  }
}
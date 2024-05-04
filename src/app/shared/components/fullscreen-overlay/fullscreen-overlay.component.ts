import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-fullscreen-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fullscreen-overlay.component.html',
  styleUrl: './fullscreen-overlay.component.scss',
})
export class FullscreenOverlayComponent {
  @Output()
  onClick = new EventEmitter<MouseEvent>();

  @Input()
  className = '';

  @Input()
  showBackdrop = false;
}

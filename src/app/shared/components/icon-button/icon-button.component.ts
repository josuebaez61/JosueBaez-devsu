import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss',
})
export class IconButtonComponent {
  @Input()
  className = '';

  @Input()
  icon = '';

  @Input()
  rounded = false;

  @Output()
  onClick = new EventEmitter<MouseEvent>();
}

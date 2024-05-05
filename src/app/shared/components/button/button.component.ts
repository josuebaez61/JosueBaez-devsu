import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input()
  color = 'primary';

  @Input()
  buttonStyleClass = '';

  @Input()
  rounded = false;

  @Input()
  type = 'button';

  @Input()
  disabled = false;

  @Input()
  iconButton = false;

  @Input()
  loading = false;

  @Output()
  onClick = new EventEmitter<MouseEvent>();

  get roundedStyleClass(): string {
    return this.rounded ? 'rounded' : '';
  }
  get iconButtonStyleClass(): string {
    return this.iconButton ? 'icon-button' : '';
  }
}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-form-field-errors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-field-errors.component.html',
  styleUrl: './form-field-errors.component.scss',
})
export class FormFieldErrorsComponent {
  @Input()
  validationErrors?: ValidationErrors | null = null;

  get validationErrorMessages(): string {
    let message = '';

    const errorMessages: Record<string, string> = {
      required: 'Este campo es requerido',
    };

    if (this.validationErrors) {
      for (const key in this.validationErrors) {
        if (Object.prototype.hasOwnProperty.call(this.validationErrors, key)) {
          const element = this.validationErrors[key];
          message += errorMessages[key] + '. ';
        }
      }
    }

    return message;
  }
}

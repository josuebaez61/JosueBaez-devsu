import { Component, ContentChild, ContentChildren } from '@angular/core';
import { FormFieldErrorsComponent } from '../form-field-errors/form-field-errors.component';
import { NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule, FormFieldErrorsComponent],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
})
export class FormFieldComponent {
  @ContentChild(NgControl)
  control?: NgControl;

  get isInvalid(): boolean {
    return !!(this.control?.invalid && this.control.touched);
  }
}

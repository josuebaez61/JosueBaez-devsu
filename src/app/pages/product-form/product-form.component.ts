import { Component } from '@angular/core';
import {
  ButtonComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  FormFieldComponent,
} from '../../shared/components';
import { InputTextDirective } from '../../shared/directives/input-text.directive';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    CardFooterComponent,
    ButtonComponent,
    FormFieldComponent,
    InputTextDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
  formGroup: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.formGroup = this.fb.group({
      id: this.fb.control('', [Validators.required]),
      name: this.fb.control('', [Validators.required]),
      description: this.fb.control('', [Validators.required]),
      logo: this.fb.control('', [Validators.required]),
      date_release: this.fb.control('', [Validators.required]),
      date_revision: this.fb.control('', [Validators.required]),
    });
  }

  onCancel(): void {
    this.router.navigate(['']);
  }
}

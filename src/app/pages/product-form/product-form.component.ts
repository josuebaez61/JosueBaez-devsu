import { Component, OnDestroy } from '@angular/core';
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
import { ProductsService } from '../../core/services/products.service';

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
export class ProductFormComponent implements OnDestroy {
  formGroup: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productsService: ProductsService
  ) {
    this.formGroup = this.fb.group({
      id: this.fb.control('', [Validators.required]),
      name: this.fb.control('', [Validators.required]),
      description: this.fb.control('', [Validators.required]),
      logo: this.fb.control('', [Validators.required]),
      date_release: this.fb.control('', [Validators.required]),
      date_revision: this.fb.control('', [Validators.required]),
    });

    if (this.productsService.editingProduct) {
      this.formGroup.patchValue(this.productsService.editingProduct);
      this.formGroup.get('id')?.disable();
    }
  }

  get isEditing(): boolean {
    return !!this.productsService.editingProduct;
  }

  ngOnDestroy(): void {
    this.productsService.editingProduct = null;
  }

  onCancel(): void {
    this.router.navigate(['']);
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
    } else {
      const obs$ = this.isEditing
        ? this.productsService.updateProduct(this.formGroup.getRawValue())
        : this.productsService.createProduct(this.formGroup.getRawValue());

      this.isLoading = true;

      this.formGroup.disable();

      obs$.subscribe({
        next: () => {
          this.router.navigate(['']);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }
}

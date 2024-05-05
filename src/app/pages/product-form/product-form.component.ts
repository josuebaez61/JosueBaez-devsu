import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { Subscription } from 'rxjs';
import { minDateValidator, productIdValidator } from '../../core/utils';

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
export class ProductFormComponent implements OnDestroy, OnInit {
  formGroup: FormGroup;
  isLoading = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productsService: ProductsService
  ) {
    this.formGroup = this.fb.group({
      id: this.fb.control(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
        [productIdValidator(productsService)]
      ),
      name: this.fb.control('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
      description: this.fb.control('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200),
      ]),
      logo: this.fb.control('', [Validators.required]),
      date_release: this.fb.control('', [
        Validators.required,
        minDateValidator(new Date()),
      ]),
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

  get dateReleaseMinDate() {
    let today = new Date();
    let dd: string | number = today.getDate();
    let mm: string | number = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    return yyyy + '-' + mm + '-' + dd;
  }

  get dateRevisionMinDate() {
    const dateReleaseSplitted = this.formGroup
      .get('date_release')
      ?.value.split('-');
    const releaseYear = dateReleaseSplitted[0];
    const nextYear = parseInt(releaseYear) + 1;
    return (
      nextYear + '-' + dateReleaseSplitted[1] + '-' + dateReleaseSplitted[2]
    );
  }

  get formGroupIsPending(): boolean {
    return this.formGroup.status === 'PENDING';
  }

  ngOnInit(): void {
    this.subscribeToDateReleaseControlChange();
  }

  ngOnDestroy(): void {
    this.productsService.editingProduct = null;
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  subscribeToDateReleaseControlChange() {
    const subs = this.formGroup.get('date_release')?.valueChanges.subscribe({
      next: (newValue) => {
        const nextYearValue = new Date(newValue);
        nextYearValue.setFullYear(nextYearValue.getFullYear() + 1);

        const dateRevisionControl = this.formGroup.get('date_revision');
        dateRevisionControl?.reset();
        dateRevisionControl?.addValidators(
          minDateValidator(new Date(nextYearValue))
        );
        dateRevisionControl?.updateValueAndValidity();
      },
    });
    if (subs) this.subscriptions.push(subs);
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

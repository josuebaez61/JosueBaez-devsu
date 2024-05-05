import {
  ComponentFixture,
  fakeAsync,
  flushMicrotasks,
  TestBed,
  tick,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductFormComponent } from './product-form.component';
import { ProductsService } from '../../core/services/products.service';
import { Validators } from '@angular/forms';
import { formatDate, randomString } from '../../core/utils';
import { inject } from '@angular/core';
import { Product } from '../../core/models';
import { Router } from '@angular/router';
import { ProductsMockService } from '../../core/mocks';
import productMock from '../../core/mocks/product-mock';
import { of } from 'rxjs';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let productService: ProductsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFormComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ProductsService,
          useClass: ProductsMockService,
        },
        {
          provide: Router,
          useValue: {
            navigate: (commands: string[]) => {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should define the form group', () => {
    expect(component.formGroup).toBeTruthy();
  });

  it('should define the form controls', () => {
    expect(component.formGroup.get('id')).toBeTruthy();
    expect(component.formGroup.get('name')).toBeTruthy();
    expect(component.formGroup.get('description')).toBeTruthy();
    expect(component.formGroup.get('logo')).toBeTruthy();
    expect(component.formGroup.get('date_release')).toBeTruthy();
    expect(component.formGroup.get('date_revision')).toBeTruthy();
  });

  it('should validate the id form control', () => {
    const control = component.formGroup.get('id');
    control?.setValue(null);
    expect(control?.hasError('required')).toBeTrue();

    control?.setValue(randomString(2));
    expect(control?.hasError('minlength')).toBeTrue();

    control?.setValue(randomString(11));
    expect(control?.hasError('maxlength')).toBeTrue();

    control?.setValue(randomString(3));
    expect(control?.errors).toBeNull();
  });

  it('should validate the name form control', () => {
    const control = component.formGroup.get('name');
    control?.setValue(null);
    expect(control?.hasError('required')).toBeTrue();

    control?.setValue(randomString(4));
    expect(control?.hasError('minlength')).toBeTrue();

    control?.setValue(randomString(101));
    expect(control?.hasError('maxlength')).toBeTrue();

    control?.setValue(randomString(5));
    expect(control?.errors).toBeNull();
  });

  it('should validate the description form control', () => {
    const control = component.formGroup.get('description');
    control?.setValue(null);
    expect(control?.hasError('required')).toBeTrue();

    control?.setValue(randomString(9));
    expect(control?.hasError('minlength')).toBeTrue();

    control?.setValue(randomString(201));
    expect(control?.hasError('maxlength')).toBeTrue();

    control?.setValue(randomString(10));
    expect(control?.errors).toBeNull();
  });

  it('should validate the logo form control', () => {
    const control = component.formGroup.get('logo');
    control?.setValue(null);
    expect(control?.hasError('required')).toBeTrue();

    control?.setValue('https://placehold.co/600x400');
    expect(control?.errors).toBeNull();
  });

  it('should validate the date_release form control', () => {
    const control = component.formGroup.get('date_release');
    control?.setValue(null);
    expect(control?.hasError('required')).toBeTrue();

    let today = new Date();
    today.setDate(today.getDate() - 1);
    control?.setValue(today);
    expect(control?.hasError('minDate')).toBeTrue();

    today = new Date();
    control?.setValue(today);
    expect(control?.errors).toBeNull();
  });

  it('should validate the date_revision form control', () => {
    const dateRevisionControl = component.formGroup.get('date_revision');
    const dateReleaseControl = component.formGroup.get('date_release');

    dateRevisionControl?.setValue(null);
    expect(dateRevisionControl?.hasError('required')).toBeTrue();

    let today = new Date();
    dateReleaseControl?.setValue(today);
    today.setDate(today.getDate() - 1);
    today.setFullYear(today.getFullYear() + 1);
    dateRevisionControl?.setValue(today);
    expect(dateRevisionControl?.hasError('minDate')).toBeTrue();

    today = new Date();
    dateReleaseControl?.setValue(today);
    today.setFullYear(today.getFullYear() + 1);
    dateRevisionControl?.setValue(today);
    expect(dateReleaseControl?.errors).toBeNull();
  });

  it('should patch the form value when "editingProduct" has value, should disable the id form control, should set "isEditing" to true', () => {
    productService.editingProduct = new Product(
      'trj-crd',
      'Tarjetas de crédito',
      'https://placehold.co/600x400',
      'Tarjeta de consumo bajo modalidad de crédito',
      '2024-01-01',
      '2025-01-01'
    );
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.formGroup.getRawValue()).toEqual({
      id: 'trj-crd',
      name: 'Tarjetas de crédito',
      logo: 'https://placehold.co/600x400',
      description: 'Tarjeta de consumo bajo modalidad de crédito',
      date_release: '2024-01-01',
      date_revision: '2025-01-01',
    });
    expect(component.isEditing).toBeTrue();
    expect(component.formGroup.get('id')?.disabled).toBeTrue();
  });

  it('should mark all form controls as touched when submit has been called and the form group is invalid', () => {
    component.formGroup.patchValue({
      id: '',
      name: '',
      logo: '',
      description: '',
      date_release: '',
      date_revision: '',
    });
    component.onSubmit();
    expect(
      Object.values(component.formGroup.controls).every((c) => !!c.touched)
    ).toBeTrue();
  });

  it('should call to productsService.createProduct when submit a valid form group', () => {
    const today = new Date();
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    component.formGroup.patchValue({
      id: 'trj-crd',
      name: 'Tarjetas de crédito',
      logo: 'https://placehold.co/600x400',
      description: 'Tarjeta de consumo bajo modalidad de crédito',
      date_release: formatDate(today),
      date_revision: formatDate(nextYear),
    });
    const spyOnCreateProduct = spyOn(productService, 'createProduct');
    spyOnCreateProduct.and.returnValue(of(productMock));
    component.onSubmit();
    expect(spyOnCreateProduct).toHaveBeenCalled();
  });
});

import { inject, runInInjectionContext } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { map, Observable, of } from 'rxjs';
import { ProductsService } from '../services/products.service';

export function minDateValidator(date: Date): ValidatorFn {
  return (control: AbstractControl) => {
    const inputDate = new Date(control.value);
    const minDate = new Date(date);
    inputDate.setUTCHours(0, 0, 0, 0);
    minDate.setUTCHours(0, 0, 0, 0);

    if (inputDate < minDate) {
      return {
        minDate: true,
      };
    }
    return null;
  };
}

export function productIdValidator(
  productsService: ProductsService
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return productsService.existsProduct(control.value).pipe(
      map((exists) => {
        if (exists) {
          return {
            productIdExists: true,
          };
        }
        return null;
      })
    );
  };
}

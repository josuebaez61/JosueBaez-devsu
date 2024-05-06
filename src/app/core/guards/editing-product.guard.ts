import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ProductsService } from '../services/products.service';

export const editingProductGuard: CanActivateFn = () => {
  const productsService = inject(ProductsService);
  const router = inject(Router);
  return !!productsService.editingProduct || router.createUrlTree([]);
};

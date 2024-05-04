import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/full/full.component').then((c) => c.FullComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home.component').then((c) => c.HomeComponent),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./pages/product-form/product-form.component').then(
            (c) => c.ProductFormComponent
          ),
      },
      {
        path: 'edit',
        loadComponent: () =>
          import('./pages/product-form/product-form.component').then(
            (c) => c.ProductFormComponent
          ),
      },
    ],
  },
];

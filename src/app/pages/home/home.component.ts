import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import {
  ButtonComponent,
  CardComponent,
  FormFieldComponent,
  PopupMenuComponent,
  PaginatorComponent,
  TableComponent,
  CardBodyComponent,
} from '../../shared/components';
import { CommonModule } from '@angular/common';
import { IconButtonComponent } from '../../shared/components/icon-button/icon-button.component';
import { MenuItem, Product } from '../../core/models';
import { Router } from '@angular/router';
import { ConfirmService } from '../../core/services/confirm.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    FormFieldComponent,
    TableComponent,
    ButtonComponent,
    CardBodyComponent,
    PaginatorComponent,
    PopupMenuComponent,
    IconButtonComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  products: any[] = [];

  constructor(
    private productsService: ProductsService,
    private confirmService: ConfirmService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe({
      next: (p) => (this.products = p),
    });
  }

  getPopupMenuItems(product: Product): MenuItem[] {
    return [
      new MenuItem({
        label: 'Editar',
        onClick: () => {
          this.router.navigate(['edit', product.id]);
        },
      }),
      new MenuItem({
        label: 'Eliminar',
        onClick: () => {
          this.confirmService.open({
            message: `¿Estas seguro de eliminar el producto <b>${product.name}</b>?`,
          });
        },
      }),
    ];
  }

  onCreate(): void {
    this.router.navigate(['create']);
  }
}

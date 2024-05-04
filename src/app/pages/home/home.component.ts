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
import { AvatarComponent } from '../../shared/components/avatar/avatar.component';
import { InputTextDirective } from '../../shared/directives/input-text.directive';

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
    AvatarComponent,
    InputTextDirective,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private confirmService: ConfirmService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe({
      next: (p) => {
        this.products = p;
        this.filteredProducts = p;
      },
    });
  }

  getPopupMenuItems(product: Product): MenuItem[] {
    return [
      new MenuItem({
        label: 'Editar',
        onClick: () => {
          this.router.navigate(['edit']);
          this.productsService.editingProduct = product;
        },
      }),
      new MenuItem({
        label: 'Eliminar',
        onClick: () => {
          this.confirmService.open({
            message: `¿Estas seguro de eliminar el producto <b>${product.name}</b>?`,
            onConfirm: () => {
              this.productsService
                .deleteProduct(product.id)
                .subscribe(console.log);
            },
          });
        },
      }),
    ];
  }

  onFilter(val: string): void {
    this.filteredProducts = this.products.filter((p) =>
      p.name.toLowerCase().includes(val.toLowerCase())
    );
  }

  onPerPageChange(val: number | string): void {
    this.filteredProducts = this.products;
    const perPage = parseInt(String(val));
    const newArray = [...this.filteredProducts];
    this.filteredProducts = newArray.slice(0, perPage);
  }

  onCreate(): void {
    this.router.navigate(['create']);
  }
}

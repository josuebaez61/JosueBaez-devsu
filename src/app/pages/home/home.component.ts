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
import { ScrollXDirective } from '../../shared/directives';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';

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
    SpinnerComponent,
    InputTextDirective,
    ScrollXDirective,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  isLoading = false;

  constructor(
    private productsService: ProductsService,
    private confirmService: ConfirmService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.isLoading = true;
    this.productsService.getProducts().subscribe({
      next: (p) => {
        this.products = p;
        this.filteredProducts = p;
      },
      complete: () => {
        this.isLoading = false;
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
              this.productsService.deleteProduct(product.id).subscribe({
                next: () => {
                  this.getProducts();
                },
              });
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

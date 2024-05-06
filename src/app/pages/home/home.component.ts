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
import { PageEvent } from '../../core/models/paginator';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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
  offset: number = 0;
  limit: number = 10;
  totalItems = 0;
  searchFilter = '';

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
        this.totalItems = p.length;
        this.onPerPageChange(this.limit);
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
    this.offset = 0;
    this.filteredProducts = this.products.filter((p) =>
      p.name.toLowerCase().includes(val.toLowerCase())
    );
    if (val.length) {
      this.totalItems = this.filteredProducts.length;
    } else {
      this.totalItems = this.products.length;
    }
  }

  onPerPageChange(val: number): void {
    this.limit = val;
    this.searchFilter = '';
    this.offset = 0;
    this.filteredProducts = this.products;
    this.filteredProducts = this.filteredProducts.slice(
      this.offset,
      this.limit
    );
  }

  onPage(ev: PageEvent): void {
    this.filteredProducts = this.products;
    this.limit = ev.perPage;
    this.offset = ev.first;
    this.filteredProducts = this.filteredProducts.slice(ev.first, ev.last);
  }

  onCreate(): void {
    this.router.navigate(['create']);
  }
}

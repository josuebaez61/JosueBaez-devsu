import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  CreateProductPayload,
  CreateProductResponse,
  GetProductsResponse,
  IProduct,
  Product,
} from '../models';
import { ToastService } from './toast.service';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly baseUrl = `${environment.apiUrl}/bp/products`;

  editingProduct: Product | null = null;

  constructor(private http: HttpClient, private toastService: ToastService) {}

  getProducts(): Observable<Product[]> {
    return this.http
      .get<GetProductsResponse>(this.baseUrl)
      .pipe(map(Product.createMany));
  }

  createProduct(payload: CreateProductPayload): Observable<Product> {
    return this.http
      .post<CreateProductResponse>(`${this.baseUrl}`, payload)
      .pipe(
        map(Product.create),
        tap(() => this.toastService.showSuccessfullySaved())
      );
  }

  updateProduct(payload: CreateProductPayload): Observable<Product> {
    return this.http.put<IProduct>(`${this.baseUrl}`, payload).pipe(
      map(Product.create),
      tap(() => this.toastService.showSuccessfullySaved())
    );
  }

  deleteProduct(id: string): Observable<string> {
    return this.http
      .delete<string>(`${this.baseUrl}?id=${id}`, {
        responseType: 'text' as 'json',
      })
      .pipe(
        tap(() =>
          this.toastService.show({
            message: '¡Eliminado!',
            severity: 'success',
          })
        )
      );
  }
}

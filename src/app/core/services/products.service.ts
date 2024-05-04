import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  CreateProductPayload,
  CreateProductResponse,
  GetProductsResponse,
  IProduct,
  Product,
} from '../models';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly baseUrl = `${environment.apiUrl}/bp/products`;

  editingProduct: Product | null = null;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http
      .get<GetProductsResponse>(this.baseUrl)
      .pipe(map(Product.createMany));
  }

  createProduct(payload: CreateProductPayload): Observable<Product> {
    return this.http
      .post<CreateProductResponse>(`${this.baseUrl}`, payload)
      .pipe(map(Product.create));
  }

  updateProduct(payload: CreateProductPayload): Observable<Product> {
    return this.http
      .put<IProduct>(`${this.baseUrl}`, payload)
      .pipe(map(Product.create));
  }

  deleteProduct(id: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}?id=${id}`);
  }
}

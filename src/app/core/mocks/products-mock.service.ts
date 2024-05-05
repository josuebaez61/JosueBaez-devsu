import { Observable, of } from 'rxjs';
import { CreateProductPayload, Product } from '../models';
import productMock from './product-mock';

export class ProductsMockService {
  editingProduct: Product | null = null;

  existsProduct(id: string): Observable<boolean> {
    return of(false);
  }

  createProduct(payload: CreateProductPayload): Observable<Product> {
    return of(productMock);
  }

  updateProduct(payload: CreateProductPayload): Observable<Product> {
    return of(productMock);
  }
}

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { TestBed } from '@angular/core/testing';
import { Product } from '../models';
import { formatDate } from '../utils';

describe('ProductsService', () => {
  let productsService: ProductsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [],
    });

    productsService = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should get products works', () => {
    productsService.getProducts().subscribe({
      next: (p) => {
        expect(p.every((i) => i instanceof Product)).toBeTrue();
      },
    });
    httpController
      .expectOne({
        method: 'GET',
        url: productsService.baseUrl,
      })
      .flush([
        {
          id: '3213212',
          name: 'Portatil Hp - 2',
          description: 'Core i5 10 generacion',
          logo: 'https://www.mastercard.es/content/dam/public/mastercardcom/eu/es/images/Consumidores/escoge-tu-tarjeta/credito/credito-world/1280x720-mc-sym-card-wrld-ci-5BIN-mm.png',
          date_release: '2024-04-30T00:00:00.000+00:00',
          date_revision: '2024-05-02T00:00:00.000+00:00',
        },
        {
          id: '873542',
          name: 'iPhone',
          description: 'celular Apple iPhone',
          logo: 'https://www.mastercard.es/content/dam/public/mastercardcom/eu/es/images/Consumidores/escoge-tu-tarjeta/credito/credito-world/1280x720-mc-sym-card-wrld-ci-5BIN-mm.png',
          date_release: '2024-02-05T00:00:00.000+00:00',
          date_revision: '2024-02-05T00:00:00.000+00:00',
        },
        {
          id: '4343434',
          name: 'Macbook Pro',
          description: 'MacBook Pro de 16 pulgadas',
          logo: 'https://www.mastercard.es/content/dam/public/mastercardcom/eu/es/images/Consumidores/escoge-tu-tarjeta/credito/credito-world/1280x720-mc-sym-card-wrld-ci-5BIN-mm.png',
          date_release: '2024-05-05T00:00:00.000+00:00',
          date_revision: '2024-05-05T00:00:00.000+00:00',
        },
      ]);
  });

  it('should create product works', () => {
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);

    productsService
      .createProduct({
        id: 'trc-sjd',
        date_release: formatDate(new Date()),
        date_revision: formatDate(nextYear),
        name: 'Tarjetas de crédito',
        logo: 'https://placehold.co/600x400',
        description:
          'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi reprehenderit est, rem at ab quos voluptatem placeat commodi eius vero. Vitae tempore fugit iste eveniet et natus vel aliquam ab.',
      })
      .subscribe({
        next: (p) => {
          expect(p instanceof Product).toBeTrue();
        },
      });
    httpController
      .expectOne({
        method: 'POST',
        url: productsService.baseUrl,
      })
      .flush({
        id: 'trc-sjd',
        date_release: formatDate(new Date()),
        date_revision: formatDate(nextYear),
        name: 'Tarjetas de crédito',
        logo: 'https://placehold.co/600x400',
        description:
          'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi reprehenderit est, rem at ab quos voluptatem placeat commodi eius vero. Vitae tempore fugit iste eveniet et natus vel aliquam ab.',
      });
  });

  it('should update product works', () => {
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);

    productsService
      .updateProduct({
        id: 'trc-sjd',
        date_release: formatDate(new Date()),
        date_revision: formatDate(nextYear),
        name: 'Tarjetas de crédito',
        logo: 'https://placehold.co/600x400',
        description:
          'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi reprehenderit est, rem at ab quos voluptatem placeat commodi eius vero. Vitae tempore fugit iste eveniet et natus vel aliquam ab.',
      })
      .subscribe({
        next: (p) => {
          expect(p instanceof Product).toBeTrue();
        },
      });
    httpController
      .expectOne({
        method: 'PUT',
        url: productsService.baseUrl,
      })
      .flush({
        id: 'trc-sjd',
        date_release: formatDate(new Date()),
        date_revision: formatDate(nextYear),
        name: 'Tarjetas de crédito',
        logo: 'https://placehold.co/600x400',
        description:
          'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi reprehenderit est, rem at ab quos voluptatem placeat commodi eius vero. Vitae tempore fugit iste eveniet et natus vel aliquam ab.',
      });
  });

  it('should delete product works', () => {
    productsService.deleteProduct('trc-sjd').subscribe({
      next: (res) => {
        expect(res).toBe('Product successfully removed');
      },
    });
    httpController
      .expectOne({
        method: 'DELETE',
        url: productsService.baseUrl + '?id=' + 'trc-sjd',
      })
      .flush('Product successfully removed');
  });

  it('should verify product works', () => {
    productsService.existsProduct('trc-sjd').subscribe({
      next: (res) => {
        expect(res).toBeTrue();
      },
    });
    httpController
      .expectOne({
        method: 'GET',
        url: productsService.baseUrl + '/verification' + '?id=' + 'trc-sjd',
      })
      .flush(true);
  });
});

import { IProduct } from '../product';

export type GetProductsResponse = IProduct[];
export type CreateProductResponse = IProduct;

export type CreateProductPayload = {
  id: string | null;
  name: string | null;
  description: string | null;
  logo: string | null;
  date_release: string | null;
  date_revision: string | null;
};

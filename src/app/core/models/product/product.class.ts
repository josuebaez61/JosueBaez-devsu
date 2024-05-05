import { toUTC } from '../../utils/date';
import { IProduct } from './product.interface';

export class Product {
  constructor(
    public id: string,
    public name: string,
    public logo: string,
    public description: string,
    public date_release: string,
    public date_revision: string
  ) {}

  get formatedDateRelease(): string {
    const date = toUTC(this.date_release);
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }

  get formatedDateRevision(): string {
    const date = toUTC(this.date_revision);
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }

  static createMany(data: IProduct[]): Product[] {
    return data.map(Product.create);
  }

  static create(props: IProduct): Product {
    return new Product(
      props.id,
      props.name,
      props.logo,
      props.description,
      props.date_release,
      props.date_revision
    );
  }
}

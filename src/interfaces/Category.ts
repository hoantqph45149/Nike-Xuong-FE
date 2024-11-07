export interface Category {
  _id?: number | string;
  name: string;
  slug: string;
  description: string;
  isHidden: boolean;
  products: string[];
}

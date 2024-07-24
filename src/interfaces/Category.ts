export interface Category {
  _id?: string;
  name: string;
  slug: string;
  description: string;
  isHidden: boolean;
  products: string[];
}

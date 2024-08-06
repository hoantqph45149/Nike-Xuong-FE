export interface Product {
  _id?: string;
  title: string;
  price: number;
  description?: string;
  categoryId: {
    _id: string;
    name: string;
    slug: string;
    description: string;
    isHidden: boolean;
    products: string[];
  };
  thumbnail?: string;
  sizes: Array<{
    _id?: string;
    size: string;
    quantity: number;
  }>;
}

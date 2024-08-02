export interface Product {
  _id?: string;
  title: string;
  price: number;
  description: string;
  categoryId: {
    _id?: string;
    name: string;
    description: string;
    thumbnail: string;
    slug: string;
  };
  thumbnail: string;
}

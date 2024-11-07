interface OrderProduct {
  product: string;
  quantity: number;
  size: string;
}

export interface Orders {
  _id: string;
  userId: string;
  products: OrderProduct[];
  status:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "cancel_pending";
  name: string;
  address: string;
  phone: string;
  note?: string;
  totalAmount: number;
  date?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

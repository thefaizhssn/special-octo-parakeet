export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  created_at: string;
  user_id: string;
}

export interface Subscription {
  id: string;
  product_id: string;
  user_id: string;
  status: 'active' | 'cancelled' | 'pending';
  created_at: string;
}
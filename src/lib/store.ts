import { create } from 'zustand';
import { supabase } from './supabase';
import type { Product, Subscription } from './types';

interface StoreState {
  products: Product[];
  subscriptions: Subscription[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
  fetchUserSubscriptions: () => Promise<void>;
  createProduct: (product: Omit<Product, 'id' | 'created_at' | 'user_id'>) => Promise<void>;
  subscribeToProduct: (productId: string) => Promise<void>;
}

export const useStore = create<StoreState>((set, get) => ({
  products: [],
  subscriptions: [],
  loading: false,

  fetchProducts: async () => {
    set({ loading: true });
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      return;
    }

    set({ products: data, loading: false });
  },

  fetchUserSubscriptions: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching subscriptions:', error);
      return;
    }

    set({ subscriptions: data });
  },

  createProduct: async (product) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('products')
      .insert([{ ...product, user_id: user.id }]);

    if (error) {
      console.error('Error creating product:', error);
      return;
    }

    get().fetchProducts();
  },

  subscribeToProduct: async (productId) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('subscriptions')
      .insert([{
        product_id: productId,
        user_id: user.id,
        status: 'pending'
      }]);

    if (error) {
      console.error('Error creating subscription:', error);
      return;
    }

    get().fetchUserSubscriptions();
  }
}));
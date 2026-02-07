import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { CartItem, Product } from '@/lib/types';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, variantId?: string, quantity?: number) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, isInitialized]);
  
  const addItem = (product: Product, variantId?: string, quantity = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.variantId === variantId
      );
      
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      
      return [...prev, { product, variantId, quantity }];
    });
  };
  
  const removeItem = (productId: string, variantId?: string) => {
    setItems((prev) => 
      prev.filter((item) => !(item.product.id === productId && item.variantId === variantId))
    );
  };
  
  const updateQuantity = (productId: string, quantity: number, variantId?: string) => {
    if (quantity < 1) {
      removeItem(productId, variantId);
      return;
    }
    
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.variantId === variantId
          ? { ...item, quantity }
          : item
      )
    );
  };
  
  const clearCart = () => setItems([]);
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

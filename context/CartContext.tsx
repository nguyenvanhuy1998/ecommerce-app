import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';

// Define the cart item type
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// Define the cart context type
interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id' | 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  getTax: () => number;
  getShipping: () => number;
  getTotal: () => number;
}

// Create the cart context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart storage key
const CART_STORAGE_KEY = 'secure_cart_items';

// Sample initial cart items for demo purposes
const initialCartItems: CartItem[] = [];

// Cart provider props
interface CartProviderProps {
  children: ReactNode;
  taxRate?: number;
  shippingFee?: number;
}

// Create the cart provider
export function CartProvider({ 
  children, 
  taxRate = 0.08, // 8% tax rate by default
  shippingFee = 10.00, // $10 shipping fee by default
}: CartProviderProps) {
  // State for cart items
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart items from storage
  useEffect(() => {
    const loadCartItems = async () => {
      try {
        // Load cart items from SecureStore
        const storedCart = await SecureStore.getItemAsync(CART_STORAGE_KEY);
        
        if (storedCart) {
          setItems(JSON.parse(storedCart));
        } else {
          // For demo purposes, we're using a static cart if nothing is stored
          setItems(initialCartItems);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading cart items:', error);
        setIsLoading(false);
      }
    };
    
    loadCartItems();
  }, []);
  
  // Save cart items to storage whenever they change
  useEffect(() => {
    const saveCartItems = async () => {
      try {
        // Save cart items to SecureStore
        await SecureStore.setItemAsync(CART_STORAGE_KEY, JSON.stringify(items));
      } catch (error) {
        console.error('Error saving cart items:', error);
      }
    };
    
    // Only save if cart is not in initial loading state
    if (!isLoading) {
      saveCartItems();
    }
  }, [items, isLoading]);

  // Add an item to the cart
  const addItem = (item: Omit<CartItem, 'id' | 'quantity'>) => {
    setItems((prevItems) => {
      // Check if the item is already in the cart
      const existingItemIndex = prevItems.findIndex(
        (i) => i.productId === item.productId
      );

      if (existingItemIndex >= 0) {
        // If the item exists, increase its quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // If the item doesn't exist, add it with a new ID and quantity of 1
        return [
          ...prevItems,
          {
            ...item,
            id: Date.now().toString(), // Generate a unique ID
            quantity: 1,
          },
        ];
      }
    });
  };

  // Remove an item from the cart
  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Update the quantity of an item
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      // If quantity is 0 or negative, remove the item
      removeItem(id);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Clear the cart
  const clearCart = () => {
    setItems([]);
  };

  // Get the total number of items in the cart
  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  // Get the subtotal of all items in the cart
  const getSubtotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Get the tax amount
  const getTax = () => {
    return getSubtotal() * taxRate;
  };

  // Get the shipping fee
  const getShipping = () => {
    return items.length > 0 ? shippingFee : 0;
  };

  // Get the total price including tax and shipping
  const getTotal = () => {
    return getSubtotal() + getTax() + getShipping();
  };

  // Create the context value
  const contextValue: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemCount,
    getSubtotal,
    getTax,
    getShipping,
    getTotal,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartContext; 
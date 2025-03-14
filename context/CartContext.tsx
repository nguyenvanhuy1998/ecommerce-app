import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

  // Load cart from storage on mount
  useEffect(() => {
    const loadCart = async () => {
      try {
        // In a real app, you would load from AsyncStorage or similar
        // const storedCart = await AsyncStorage.getItem('cart');
        // if (storedCart) {
        //   setItems(JSON.parse(storedCart));
        // }
      } catch (error) {
        console.error('Failed to load cart from storage', error);
      }
    };

    loadCart();
  }, []);

  // Save cart to storage when it changes
  useEffect(() => {
    const saveCart = async () => {
      try {
        // In a real app, you would save to AsyncStorage or similar
        // await AsyncStorage.setItem('cart', JSON.stringify(items));
      } catch (error) {
        console.error('Failed to save cart to storage', error);
      }
    };

    saveCart();
  }, [items]);

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
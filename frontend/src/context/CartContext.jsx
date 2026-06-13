import { createContext, useContext, useState, useEffect } from 'react';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems]         = useState([]);
  const [isOpen, setIsOpen]       = useState(false);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('vogn_cart');
      if (saved) setItems(JSON.parse(saved));
    } catch {
      localStorage.removeItem('vogn_cart');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('vogn_cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product, quantity = 1, color = null, size = null) => {
    setItems(prev => {
      const key = `${product._id}-${color}-${size}`;
      const existing = prev.find(i => `${i._id}-${i.selectedColor}-${i.selectedSize}` === key);
      if (existing) {
        return prev.map(i =>
          `${i._id}-${i.selectedColor}-${i.selectedSize}` === key
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { ...product, quantity, selectedColor: color, selectedSize: size }];
    });
  };

  const removeItem = (id, color, size) => {
    setItems(prev =>
      prev.filter(i => !(i._id === id && i.selectedColor === color && i.selectedSize === size))
    );
  };

  const updateQuantity = (id, color, size, quantity) => {
    if (quantity < 1) return removeItem(id, color, size);
    setItems(prev =>
      prev.map(i =>
        i._id === id && i.selectedColor === color && i.selectedSize === size
          ? { ...i, quantity }
          : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems    = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice    = items.reduce((sum, i) => sum + (i.discountPrice || i.price) * i.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, isOpen, setIsOpen,
      addItem, removeItem, updateQuantity, clearCart,
      totalItems, totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
};

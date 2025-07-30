import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const storedCart = localStorage.getItem(`cart_${user.id}`);
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
      const storedOrders = localStorage.getItem(`orders_${user.id}`);
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      }
    }
  }, [user]);

  const saveCart = (newCart) => {
    setCart(newCart);
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(newCart));
    }
  };

  const saveOrders = (newOrders) => {
    setOrders(newOrders);
    if (user) {
      localStorage.setItem(`orders_${user.id}`, JSON.stringify(newOrders));
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      const updatedCart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      saveCart(updatedCart);
    } else {
      saveCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    saveCart(updatedCart);
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );
    saveCart(updatedCart);
  };

 
  const checkout = (userDetails = {}) => {
    if (cart.length === 0) return;

    const userName = user?.name || '';

    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      items: [...cart],
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      status: 'Processing',
      name: userName,
      ...userDetails 
    };

    saveOrders([newOrder, ...orders]);
    saveCart([]);
  };

  const cancelOrder = (orderId) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: 'Cancelled' } : order
    );
    saveOrders(updatedOrders);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      orders,
      addToCart,
      removeFromCart,
      updateQuantity,
      checkout,
      cartTotal,
      cartCount,
      cancelOrder
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
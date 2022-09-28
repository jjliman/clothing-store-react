import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  console.log('adding to cart');
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
  
  if (existingCartItem) {
    return cartItems.map(cartItem => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem);
  }
  
  return [...cartItems, {...productToAdd, quantity: 1}];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  console.log('adding to cart');
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);
  
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }
  
  return cartItems.map(cartItem => cartItem.id === cartItemToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(prev => addCartItem(prev, productToAdd));
  };

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(prev => removeCartItem(prev, cartItemToRemove));
  };

  const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, cartItems, cartCount };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};

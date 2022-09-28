import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = () => {
  const { setIsCartOpen, cartItems } = useContext(CartContext);
  const toggleIsCartOpen = () => {
    setIsCartOpen(prev => !prev);
  };

  const itemCount = cartItems.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);
  
  return (
    <div className='cart-icon-container' onClick={toggleIsCartOpen}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{itemCount}</span>
    </div>
  );
};

export default CartIcon;
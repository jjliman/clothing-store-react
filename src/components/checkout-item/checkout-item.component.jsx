import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import './checkout-item.styles.scss';


const CheckoutItem = ({ cartItem }) => {
  const { cartItems, addItemToCart, removeItemFromCart } = useContext(CartContext);
  const { id, name, imageUrl, price, quantity } = cartItem;
  const incrementProduct = () => {
    console.log(`item id is ${id}`);
    addItemToCart(cartItem);
  }
  const decrementProduct = () => {
    removeItemFromCart(cartItem);
  }
  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>{quantity}</span>
      <span className='price'>{price}</span>
      {/* <span onClick={decrementProduct}>decrement</span>
      <span onClick={incrementProduct}>increment</span> */}
      <div className='remove-button'>&#10005;</div>
    </div>
  );
};

export default CheckoutItem;

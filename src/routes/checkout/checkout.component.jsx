import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import './checkout.styles.scss';

const Checkout = () => {
  const { cartItems, addItemToCart, removeItemFromCart } = useContext(CartContext);

  return (
    <div>
      <h1>CHECKOUT PAGE</h1>
      <div>
        {
          cartItems.map(cartItem => {
            const { id, name, quantity } = cartItem;
            const incrementProduct = () => {
              console.log(`item id is ${id}`);
              addItemToCart(cartItem);
            }
            const decrementProduct = () => {
              removeItemFromCart(cartItem);
            }
            return (
              <div key={id}>
                <h2>{name}</h2>
                <span>{quantity}</span>
                <br />
                <span onClick={decrementProduct}>decrement</span>
                <br />
                <span onClick={incrementProduct}>increment</span>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default Checkout;
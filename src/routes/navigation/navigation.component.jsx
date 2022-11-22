import { Fragment, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { ReactComponent as CowLogo } from '../../assets/cow-svgrepo-com.svg';
// import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import { useSelector } from 'react-redux';
import { CartContext } from '../../contexts/cart.context';
import { selectCurrentUser } from '../../store/user/user.selector';

import { signOutUser } from '../../utils/firebase/firebase.utils';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles';

// import './navigation.styles.scss';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const { isCartOpen } = useContext(CartContext);

  // console.log(currentUser);
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CowLogo className='logo' width='50px' height='39px' />
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>
            SHOP
          </NavLink>
          {currentUser ? (<NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>) : (<NavLink to='/auth'>SIGN IN</NavLink>)}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
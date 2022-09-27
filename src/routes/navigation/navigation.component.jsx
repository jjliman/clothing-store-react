import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CowLogo } from '../../assets/cow-svgrepo-com.svg';
// import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import { UserContext } from '../../contexts/user.context';

import { signOutUser } from '../../utils/firebase/firebase.utils';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import './navigation.styles.scss';

const Navigation = () => {
  console.log('rendering navbar');
  const { currentUser } = useContext(UserContext);

  // console.log(currentUser);
  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <CowLogo className='logo' width='50px' height='39px' />
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>
          {currentUser ? (<span className='nav-link' onClick={signOutUser}>SIGN OUT</span>) : (<Link className='nav-link' to='/auth'>SIGN IN</Link>)}
          <CartIcon />
        </div>
        <CartDropdown />
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
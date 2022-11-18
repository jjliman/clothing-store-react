import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { onAuthStateChangedListener, createUserDocumentFromAuth } from "./utils/firebase/firebase.utils";
import { setCurrentUser } from "./store/user/user.action";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from './routes/authentication/authentication.component';
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";

const App = () => {
  const dispatch = useDispatch();
  // console.log('rendering APP');
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      // console.log('auth changed to: ', user);
      if (user) {
        // console.log('create document from context');
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });

    return (() => {
        console.log('unsubscribing...');
        unsubscribe();
      }
    );
  }, [dispatch]); // dispatch is not going to change, so no need to put it in the dependency array even though linter complains
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;

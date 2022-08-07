import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";


// as the actual value you want to access
export const UserContext = createContext({
  currentUse: null,
  setCurrentUser: () => null
});

export const UserProvider = ({ children }) => {
  // console.log('user provider');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      // console.log('auth changed to: ', user);
      if (user) {
        // console.log('create document from context');
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return (() => {
        console.log('unsubscribing...');
        unsubscribe();
      }
    );
  }, []);

  const value = { currentUser, setCurrentUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};
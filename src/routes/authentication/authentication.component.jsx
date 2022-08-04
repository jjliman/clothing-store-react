// import { useEffect } from 'react';
// import { getRedirectResult } from 'firebase/auth';
import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

import './authentication.styles.scss';

const Authentication = () => {
  // useEffect(() => {
  //   const retrieveRedirectResult = async () => {
  //     const response = await getRedirectResult(auth);
  //     console.log(response);
  //     if (response) {
  //       const userDocRef = await createUserDocumentFromAuth(response.user);
  //     }
  //   };
  //   retrieveRedirectResult();
  // }, []);

  // const logGoogleUser = async () => {
  //   const { user } = await signInWithGooglePopup();
  //   console.log(user);
  //   if (user) {
  //     const userDocRef = await createUserDocumentFromAuth(user);
  //   }
  // }
  return (
    <div className='authentication-container'>
      {/* <button onClick={logGoogleUser}>
        Sign in with Google Popup
      </button> */}
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;

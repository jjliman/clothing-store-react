import { useState, useContext } from "react";

import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserFromEmailAndPassword } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { UserContext } from "../../contexts/user.context";

import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const { setCurrentUser } = useContext(UserContext);
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async (event) => {
    event.preventDefault();
    console.log('Google sign in...');
    const { user } = await signInWithGooglePopup();
    console.log(user);
    if (user) {
      const userDocRef = await createUserDocumentFromAuth(user);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = formFields;
    console.log("Handle submit...");
    try {
      const { user } = await signInAuthUserFromEmailAndPassword(email, password);
      console.log(user);
      setCurrentUser(user);
      resetFormFields();
    } catch(error) {
      if (error.code === 'auth/wrong-password') {
        alert('incorrect password for email');
      }
      console.log(error);
    }
    
  }

  
  return (
    <div className='sign-in-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form  onSubmit={handleSubmit}>
        <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email} />
        <FormInput label='Password' type='password' required onChange={handleChange} name='password' value={password} />
        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button type='button' buttonType='google' onClick={signInWithGoogle}>Sign In With Google</Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;

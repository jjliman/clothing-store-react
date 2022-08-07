import { useState, useEffect } from "react";

import { signInWithGooglePopup, signInAuthUserFromEmailAndPassword } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  // console.log('is');
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  
  useEffect(() => {
    // console.log('hi');
    return (()=> {
      // console.log('bye');
    });
  },[]);

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
    await signInWithGooglePopup();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = formFields;
    console.log("Handle submit...");
    try {
      await signInAuthUserFromEmailAndPassword(email, password);
      resetFormFields();
    } catch(error) {
      if (error.code === 'auth/wrong-password') {
        alert('incorrect password for email');
      }
      console.log(error);
    }
    
  }

  // console.log('sign in');
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

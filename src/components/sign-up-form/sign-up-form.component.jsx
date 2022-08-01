import { useState } from "react";

import { createAuthUserFromEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";


const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = formFields;
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const { user } = await createAuthUserFromEmailAndPassword(email, password);
      if (user) {
        console.log(user);
        const userDocRef = await createUserDocumentFromAuth(user, { displayName });
        setFormFields(defaultFormFields);
      }
      // console.log('added to db');
    } catch(error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        console.log(error);
      }
    }
    
  }
  console.log(formFields);

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form  onSubmit={handleSubmit}>
        <FormInput label='Display Name' type='text' required onChange={handleChange} name='displayName' value={displayName} />
        <FormInput label='Email' type='text' required onChange={handleChange} name='email' value={email} />
        <FormInput label='Password' type='text' required onChange={handleChange} name='password' value={password} />
        <FormInput label='Confirm Password' type='text' required onChange={handleChange} name='confirmPassword' value={confirmPassword} />
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
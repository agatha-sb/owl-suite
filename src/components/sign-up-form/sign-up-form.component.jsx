import { useState } from "react";

import FormInput from "../form-input/form-input.component";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  console.log(formFields);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if(password !== confirmPassword) {
      alert('Your password do not match')
      return
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      )

      await createUserDocumentFromAuth(user, {displayName});
      resetFormFields();
    } catch (error) {
      if(error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use")
      } else  {
        console.log("user creation encountered an error", error);
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          onChange={handleChange}
          required
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          onChange={handleChange}
          required
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          onChange={handleChange}
          required
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          onChange={handleChange}
          required
          name="confirmPassword"
          value={confirmPassword}
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;

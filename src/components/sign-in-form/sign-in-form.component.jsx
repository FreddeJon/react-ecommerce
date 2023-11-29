import React, { useState } from "react";
import FormInput from "../form-input/form.input.component";
import Button from "../button/button.component";
import "./sign-in-form.styles.scss";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: String(value) });
  };
  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password);
    } catch (error) {
      if (error.code === "auth/invalid-login-credentials") {
        alert("incorrect credentials");
      }
    }
  };
  return (
    <div className="sign-in-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmitForm} autoComplete="off">
        <FormInput
          label="Email"
          inputOptions={{
            type: "text",
            onChange: handleChange,
            value: email,
            name: "email",
            required: true,
          }}
        />
        <FormInput
          label="Password"
          inputOptions={{
            type: "password",
            onChange: handleChange,
            value: password,
            name: "password",
            required: true,
          }}
        />

        <div className="buttons-container">
          <Button
            buttonOptions={{
              type: "submit",
            }}
          >
            Sign in
          </Button>
          <Button
            buttonType="google"
            buttonOptions={{
              type: "button",
              onClick: signInWithGoogle,
            }}
          >
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;

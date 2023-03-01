import { useState } from "react";

import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmpassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmpassword } = formFields;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmpassword) {
      alert("passwords do not match");
      return;
    }

    try {
      const response = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response)
    } catch (error) {
        console.log(error)
      if (error.code === "auth/email-already-in-use") {
        alert("Email already used");
      }
      console.log("Error creating the user : ", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label>Display Name</label>
        <input
          required
          type="text"
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
        <label>Email</label>
        <input
          required
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
        />
        <label>Password</label>
        <input
          required
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
        />
        <label>Confirm Password</label>
        <input
          required
          type="password"
          onChange={handleChange}
          name="confirmpassword"
          value={confirmpassword}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUpForm;

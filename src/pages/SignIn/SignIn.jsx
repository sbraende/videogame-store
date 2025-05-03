import { useState } from "react";
import styles from "./SignIn.module.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import useSignInValidation from "../../hooks/useSignInValidation";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  // Declaring state variables
  const [signInFormData, setSignInFormData] = useState({
    email: "",
    password: "",
  });
  const [firebaseError, setFirebaseError] = useState("");
  // Destructure validate function from the validation custom hook
  const { errors, validateSignIn } = useSignInValidation();
  // useNavigato to redirect user
  const navigate = useNavigate();
  // Retrieving form data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignInFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  // Sign users in
  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateSignIn(signInFormData)) {
      return;
    }
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        signInFormData.email,
        signInFormData.password
      );
      console.log("Successfully signed in", userCredentials.user);
      navigate("/games");
      setSignInFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      setFirebaseError(error.message);
      console.log(error.message);
    }
  };
  return (
    <div className={styles.formWrapper}>
      <form className={styles.signInForm} noValidate onSubmit={handleSignIn}>
        <h1>Sign-in Form</h1>
        <fieldset className={styles.formGroup}>
          <legend className={styles.formGroupTitle}>Account Details</legend>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className={styles.formInput}
            placeholder="Enter your email address"
            value={signInFormData.email}
            onChange={handleInputChange}
          />
          {errors && <p className={styles.errorMessage}>{errors.email}</p>}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className={styles.formInput}
            placeholder="Enter your password"
            value={signInFormData.password}
            onChange={handleInputChange}
          />
          {errors && <p className={styles.errorMessage}>{errors.password}</p>}
        </fieldset>
        <p>
          Don't have an account? Create on <Link to="/sign-up">here</Link>
        </p>
        {firebaseError && (
          <p className={styles.errorMessage}>{firebaseError}</p>
        )}
        <button className={styles.signInButton}>Sign in</button>
      </form>
    </div>
  );
};

export default SignIn;

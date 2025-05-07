import { Link, useNavigate } from "react-router-dom";
import styles from "./SignIn.module.css";
import Button from "../../components/Button/Button.jsx";
import { useState } from "react";
import Modal from "../../components/Modal/Modal.jsx";
import useSignInValidation from "../../hooks/useSignInValidation.js";
import { auth } from "../../../FirebaseConfig.js";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

const SignIn = () => {
  const [signInFormData, setSignInFormData] = useState({
    email: "",
    password: "",
  });
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  // Navigate
  const navigate = useNavigate();

  // Destructure sign in validation and errors
  const { validateSignIn, signInErrors } = useSignInValidation();

  // Retrive sign in form values
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignInFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Sign user in
  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateSignIn(signInFormData)) {
      console.log("Form not valid");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        signInFormData.email,
        signInFormData.password
      );
      const user = userCredential.user;
      console.log("Successfully logged in user:", user);
      navigate("/games");
      setSignInFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // Reset password
  const handlePasswordReset = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!resetEmail.trim()) {
      setResetMessage("Email address is required to reset your password");
      return;
    } else if (!emailRegex.test(resetEmail.trim())) {
      setResetMessage("Please enter a valid email address");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMessage("Password reset email sent. Please check your inbox");
      setResetEmail("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.signInForm} noValidate onSubmit={handleSignIn}>
        <h2>Sign-in form</h2>
        <fieldset className={styles.formGroup}>
          <legend className={styles.formGroupTitle}>Account details</legend>
          {/* --- */}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email address"
            className={styles.formInput}
            onChange={handleInputChange}
            value={setSignInFormData.email}
          />
          {signInErrors && (
            <p className={styles.errorMessage}>{signInErrors.email}</p>
          )}
          {/* --- */}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            className={styles.formInput}
            onChange={handleInputChange}
            value={setSignInFormData.password}
          />
          {signInErrors && (
            <p className={styles.errorMessage}>{signInErrors.password}</p>
          )}
          {/* --- */}
        </fieldset>
        <p>
          Don't have an account? Create one <Link to="/sign-up">here</Link>
        </p>
        <p>
          Forgot your password? Reset it{" "}
          <Button
            className={styles.forgotPasswordButton}
            type="submit"
            onClick={() => setShowForgotPasswordModal(true)}
          >
            here
          </Button>
        </p>
        <Button className={styles.signInButton}>Sign in</Button>
      </form>

      {/* Modal */}
      {showForgotPasswordModal && (
        <Modal>
          <form className={styles.resetFormContainer}>
            <p>
              Please enter your email address and press "reset". You will a
              receive an email with instructions to reset your password. Follow
              the link in the email to set a new password.
            </p>
            <label htmlFor="resetEmail">Email</label>
            <input
              type="email"
              name="resetEmail"
              id="resetEmail"
              placeholder="Enter your email address"
              className={styles.formInput}
              onChange={(e) => setResetEmail(e.target.value)}
              value={resetEmail}
            />
            <div className={styles.resetButtonsContainer}>
              <Button
                className={styles.resetPasswordButton}
                onClick={handlePasswordReset}
              >
                Reset password
              </Button>
              <Button
                className={styles.closeButton}
                onClick={() => {
                  setShowForgotPasswordModal(false);
                  setResetMessage("");
                  setResetEmail("");
                }}
                type="button"
              >
                Close
              </Button>
            </div>
            {resetMessage && (
              <p className={styles.errorMessage}>{resetMessage}</p>
            )}
          </form>
        </Modal>
      )}
    </div>
  );
};

export default SignIn;

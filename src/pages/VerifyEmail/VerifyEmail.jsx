import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./VerifyEmail.module.css";
import { auth } from "../../../firebaseConfig";
import { sendEmailVerification } from "firebase/auth";
import Button from "../../components/Button/Button";

const VerifyEmail = () => {
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For redirecting

  useEffect(() => {
    const checkVerificationStatus = async () => {
      await auth.currentUser.reload(); // Refresh user data
      setEmailVerified(auth.currentUser.emailVerified);

      // Redirect to main page once email is verified
      if (auth.currentUser.emailVerified) {
        navigate("/games"); // Change "/dashboard" to your main page route
      }
    };

    const interval = setInterval(checkVerificationStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleResendVerification = async () => {
    setError(null);
    try {
      await sendEmailVerification(auth.currentUser);
      setEmailSent(true); // Show confirmation message
    } catch (error) {
      setError("Failed to send verification email. Try again later.");
    }
  };

  return (
    <div className={styles.verifyWrapper}>
      {emailVerified ? (
        <h1>Email Verified! 🎉 Redirecting to your account...</h1>
      ) : (
        <div className={styles.verificationContainer}>
          <h2>
            Check your inbox and verify your email. After verifying your email,
            you will be automatically redirected to the main page.
          </h2>
          <p>If you haven't received an email, click below to resend.</p>
          <Button
            className={styles.resendButton}
            onClick={handleResendVerification}
          >
            Resend Verification Email
          </Button>

          {emailSent && (
            <p className={styles.successMessage}>
              A verification email has been sent! Please check your inbox.
            </p>
          )}
          {error && <p className={styles.errorMessage}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;

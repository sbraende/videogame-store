import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebaseConfig";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [signUpError, setSignUpError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const signUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      sendEmailVerification(userCredential.user);
      setUser(userCredential.user);
      setSignUpError(null);
      return userCredential; // Ensure we return this
    } catch (err) {
      setSignUpError(err.message);
      throw err;
    }
  };
  return { user, signUp, signUpError };
};
export default useAuth;

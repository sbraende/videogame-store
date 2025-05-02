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
      const user = userCredential.user;
      sendEmailVerification(user);
      setUser(user);
      setSignUpError(null);
      return userCredential.user; // Ensure we return this
    } catch (err) {
      setSignUpError(err.message);
      throw err;
    }
  };
  return { user, signUp, signUpError };
};
export default useAuth;

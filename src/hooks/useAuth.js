import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../FirebaseConfig";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [signUpError, setSignUpError] = useState(null);

  const signUp = async (email, password) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      sendEmailVerification(user);
      console.log(userCredentials);
      setUser(user);
      setSignUpError(null);
      return userCredentials;
    } catch (error) {
      setSignUpError(error.message);
      throw error;
    }
  };

  return { signUp, signUpError, user };
};

export default useAuth;

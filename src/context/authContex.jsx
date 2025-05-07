import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../FirebaseConfig";

export const authContext = createContext();

const authProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return <authContext.Provider value={user}>{children}</authContext.Provider>;
};

export const getAuthContex = () => useContext(authContext);

export default authProvider;

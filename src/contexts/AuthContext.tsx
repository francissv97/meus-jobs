import { createContext, ReactNode, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { createNewUserDocumentInFirestore } from "../hooks/useFirestore";
import { auth } from "../services/firebase";
import { UserAuth } from "../types";

interface AuthContextType {
  user: UserAuth | null | undefined;
  signInWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserAuth | null | undefined>(undefined);

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    if (result.user) {
      const { displayName, photoURL, uid, email } = result.user;

      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google account.");
      }

      if (email) createNewUserDocumentInFirestore(email);

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
        email: email,
      });
    }
  }

  async function logOut() {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid, email } = user;

        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google account.");
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
          email: email,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

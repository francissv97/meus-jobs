import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../services/firebase";

export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string | null;
}

interface AuthContextType {
  user: User | "OFF" | undefined;
  signInWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | "OFF" | undefined>();

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    if (result.user) {
      const { displayName, photoURL, uid, email } = result.user;

      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google account.");
      }

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
      setUser("OFF");
    } catch (error) {
      console.log(error);
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
        setUser("OFF");
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

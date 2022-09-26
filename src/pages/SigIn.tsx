import { useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { Logo } from "../components/Logo";
import { auth } from "../services/firebase";

export function SigIn() {
  const [user, setUser] = useState<User>();

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    setUser(result.user);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex bg-zinc-600 w-full justify-center py-4">
        <Logo />
      </div>

      {user && (
        <div className="flex gap-4 items-center bg-green-600 text-zinc-100 text-2xl pl-4 font-bold">
          {user.displayName}

          <button className="bg-red-600 text-zinc-100 text-xl font-bold px-4 py-2 hover:bg-red-700 transition">
            Sair
          </button>
        </div>
      )}

      {!user && (
        <button
          onClick={signInWithGoogle}
          className="bg-sky-600 text-zinc-100 p-4 rounded w-fit"
        >
          Continuar com o Google
        </button>
      )}
    </div>
  );
}

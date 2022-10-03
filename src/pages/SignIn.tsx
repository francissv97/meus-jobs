// import { useEffect, useState } from "react";
// import { auth } from "../services/firebase";
// import {
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   signInWithPopup,
//   User,
// } from "firebase/auth";
import { Button } from "antd";
import { Logo } from "../components/Logo";
import { GoogleOutlined } from "@ant-design/icons";
import bgOne from "../assets/backgroundOne.jpg";
import bgTwo from "../assets/backgroundTwo.jpg";
import { useAuth } from "../hooks/useAuth";

export function SignIn() {
  // const [user, setUser] = useState<User>();

  // async function signInWithGoogle() {
  //   const provider = new GoogleAuthProvider();
  //   const result = await signInWithPopup(auth, provider);

  //   setUser(result.user);
  // }

  // useEffect(() => {
  //   const subscriber = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       if (!user.photoURL || !user.displayName) {
  //         throw new Error("Missing information from Google account.");
  //       }

  //       setUser(user);
  //     }
  //   });

  //   return () => subscriber();
  // }, []);
  const { signInWithGoogle } = useAuth();

  return (
    <div className="flex">
      <div className="w-0 sm:w-1/4 md:w-2/4 lg:3/4 min-h-screen relative">
        <img
          src={bgTwo}
          alt="Background images signin page."
          className="h-full object-cover"
        />

        <div className="bg-orange-500/20 absolute w-full h-full inset-0"></div>
      </div>

      <div className="flex flex-1 flex-col gap-6 bg-gradient-to-t from-zinc-400 via-zinc-200 to-zinc-100 justify-center items-center px-2">
        <Logo />

        <div className="flex flex-col">
          <span className="text-zinc-700 text-xl text-center">
            Olá profissional, que bom te ver por aqui!
          </span>

          <span className="text-zinc-700 text-2xl text-center">
            Boas-vindas!!
          </span>
        </div>

        <Button
          icon={<GoogleOutlined className="text-3xl" />}
          onClick={signInWithGoogle}
          className="flex items-center gap-1 text-xl  bg-gradient-to-bl from-orange-400 to-orange-600 text-zinc-100 p-2 rounded w-fit transition hover:scale-105"
        >
          Continuar com o Google
        </Button>

        <span>
          <a
            href="https://francissportfolio.vercel.app/"
            target="_blank"
            className="hover:text-orange-600 transition"
          >
            Francis S. Verissimo
          </a>{" "}
          &copy; {new Date().getFullYear()}
        </span>

        {/* <SignIn size={32} color="#5cabff" /> */}
        {/* <strong className="text-2xl text-zinc-600">Fazer Login</strong> */}

        {/* <Button icon={<GoogleLogo size={32} />}>Continuar com o Goole</Button> */}
      </div>

      {/* {user && (
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
      )} */}
    </div>
  );
}

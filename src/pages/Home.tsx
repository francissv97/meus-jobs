import { Loading } from "../components/Loading";
import { useAuth } from "../hooks/useAuth";
import { Dashboard } from "./Dashboard";
import { SignIn } from "./SignIn";

export function Home() {
  const { user } = useAuth();

  switch (typeof user === "undefined") {
    case true:
      return <Loading />;
    case false:
      return user ? <Dashboard /> : <SignIn />;
  }
}

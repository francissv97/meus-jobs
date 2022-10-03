import { useAuth } from "../hooks/useAuth";
import { Dashboard } from "./Dashboard";
import { SignIn } from "./SignIn";

export function Home() {
  const { user } = useAuth();

  return <>{!user ? <SignIn /> : <Dashboard />}</>;
}

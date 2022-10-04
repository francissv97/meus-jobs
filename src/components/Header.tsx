import { useAuth } from "../hooks/useAuth";
import { Logo } from "./Logo";
import { UserInfo } from "./UserInfo";

export function Header() {
  const { user } = useAuth();

  return (
    <div className="bg-zinc-600 pt-4 pb-16">
      <div className="flex items-center justify-between gap-6 max-w-4xl px-4 mx-auto">
        <Logo  />

        {user && <UserInfo name={user.name} avatar={user.avatar} />}
      </div>
    </div>
  );
}

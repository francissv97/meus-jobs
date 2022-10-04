interface Props {
  name: string;
  avatar: string;
}

export function UserInfo({ name, avatar }: Props) {
  return (
    <div className="flex gap-1 items-center justify-center">
      <img
        src={avatar}
        alt={name}
        referrerPolicy="no-referrer"
        className="w-8 rounded-full"
      />
      <span className="block text-sm sm:text-base text-zinc-100 whitespace-nowrap overflow-hidden text-ellipsis">{name}</span>
    </div>
  );
}

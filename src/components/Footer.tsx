interface Props {
  tailwindStyle?: string;
}

export function Footer({ tailwindStyle }: Props) {
  return (
    <div className={`text-center pb-2 ${tailwindStyle} `}>
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
    </div>
  );
}

import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center">
      <h1 className="text-2xl md:text-3xl font-display italic uppercase">
        <span className="text-white">East</span>
        <span className="text-primary-red">Docs</span>
        <span className="text-white text-lg md:text-xl tracking-widest ml-2">
          STUDIOS
        </span>
      </h1>
    </Link>
  );
};

export default Logo;

import { Link, useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";

const Header = () => {
  return (
    <header className="p-4 flex">
      <Link className="ml-auto" to="/login">
        Login
      </Link>
    </header>
  );
};

const Main = () => {
  const navigate = useNavigate();

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = (
      e.currentTarget.elements.namedItem("email") as HTMLInputElement
    ).value;

    navigate("/signup", { state: { email } });
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-4">
      <h1 className="flex items-center gap-2 text-4xl font-bold">
        <Logo className="w-10 h-10" /> CMO
      </h1>
      <h2 className="mt-4 text-2xl font-bold">Comunità Musicali Online</h2>
      <h3>
        Condividi le tue playlist con altri intenditori. Entra a far parte della
        community!
      </h3>
      <form onSubmit={onSubmitHandler} className="mt-4 flex">
        <input
          id="email"
          type="email"
          placeholder="La tua email"
          className="p-2.5 text-sm rounded-l border-0 bg-[#ffffff1a] text-[#ffffffb3] placeholder:text-[#ffffffb3] focus:ring-inset focus:ring-2 focus:ring-spotify-accent-base focus:border-spotify-accent-base"
        />
        <button
          className="flex bg-spotify-accent-base focus:bg-spotify-accent-highlight py-3 px-8 rounded-r text-black font-bold self-center"
          type="submit">
          Inizia
        </button>
      </form>
      <Link className="hover:underline" to="/login">
        Hai già un account?
      </Link>
    </div>
  );
};

const Footer = () => {
  return (
    // <footer className="mb-4 text-sm text-center text-neutral-600">
    //   &copy; 2022 CMO
    // </footer>
    <></>
  );
};

export const Home = () => {
  // const { isLogged } = useUsers();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

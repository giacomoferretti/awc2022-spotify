import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import { Logo } from "@/components/Logo";
import { useUsers } from "@/context/usersContext";

export const NoMatch = () => {
  const { session } = useUsers();

  return (
    <>
      <Helmet>
        <title>Pagina non trovata - {import.meta.env.VITE_SITE_TITLE}</title>
      </Helmet>

      <div className="flex min-h-screen flex-col items-center justify-center">
        <Logo className="mb-12 h-12 w-12" />
        <h1 className="text-4xl font-bold">
          Ooops... questa pagina non esiste.
        </h1>
        <p className="mt-4">
          Non riusciamo a trovare la pagina che stai cercando.
        </p>
        <Link
          className="mt-12 rounded-full bg-spotify-accent-base py-3 px-8 font-bold text-black hover:bg-spotify-accent-highlight"
          to={!session ? "/" : "/dashboard"}>
          Home
        </Link>
      </div>
    </>
  );
};

export default NoMatch;

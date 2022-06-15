import { useUsers } from "@/context/usersContext";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export const NoMatch = () => {
  const { session } = useUsers();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Helmet>
        <title>Pagina non trovata</title>
      </Helmet>
      <h1 className="text-4xl font-bold">Ooops... questa pagina non esiste.</h1>
      <p className="mt-4">
        Non riusciamo a trovare la pagina che stai cercando.
      </p>
      <Link
        className="mt-12 rounded-full bg-spotify-accent-base py-3 px-8 font-bold text-black hover:bg-spotify-accent-highlight"
        to={!session ? "/" : "/dashboard"}>
        Home
      </Link>
    </div>
  );
};

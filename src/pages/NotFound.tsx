import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Helmet>
        <title>Pagina non trovata</title>
      </Helmet>
      <h1 className="text-4xl font-bold">Ooops... questa pagina non esiste.</h1>
      <p className="mt-4">
        Non riusciamo a trovare la pagina che stai cercando.
      </p>
      <Link
        className="bg-spotify-accent-base hover:bg-spotify-accent-highlight py-3 px-8 rounded-full mt-12 text-black font-bold"
        to="/">
        Home
      </Link>
    </div>
  );
};

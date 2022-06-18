import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { Header } from "@/components/Header";
import { Spinner } from "@/components/Spinner";

export const CreatePlaylist = () => {
  useEffect(() => {}, []);

  return (
    <>
      <Helmet>
        <title>
          Crea una nuova playlist - {import.meta.env.VITE_SITE_TITLE}
        </title>
      </Helmet>
      <div className="flex min-h-full items-center justify-center gap-4">
        <Spinner className="h-10 w-10 animate-spin" />
        <h1 className="text-4xl font-bold">Creazione playlist...</h1>
      </div>
    </>
  );
};

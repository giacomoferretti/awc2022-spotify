import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

import { Spinner } from "@/components/Spinner";
import { usePlaylists, useUsers } from "@/context";
import { wait } from "@/utils/wait";

export const CreatePlaylist = () => {
  const navigate = useNavigate();
  const { session, addUserPlaylist } = useUsers();
  const { createUserPlaylist } = usePlaylists();

  useEffect(() => {
    const asyncFun = async () => {
      if (!session) return;

      if (import.meta.env.DEV) await wait(500);

      // Create playlist
      const playlistId = createUserPlaylist(session);

      // Save playlist to owner
      addUserPlaylist(session, playlistId);

      navigate(`/playlist/${playlistId}`, { replace: true });
    };

    asyncFun().catch(console.error);
  }, [addUserPlaylist, createUserPlaylist, navigate, session]);

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

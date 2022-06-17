import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

import { Header } from "@/components/Header";
import { usePlaylists } from "@/context";
import { NoMatch } from "@/pages/NoMatch";

type PlaylistParams = {
  id: string;
};

export const Playlist = () => {
  const params = useParams<PlaylistParams>();

  const { getPlaylistById } = usePlaylists();

  const playlist = useMemo(() => {
    return getPlaylistById(params.id!);
  }, []);

  // If not found, show NoMatch
  if (!playlist) return <NoMatch />;

  return (
    <>
      <Helmet>
        <title>
          {playlist.name} - {import.meta.env.VITE_SITE_TITLE}
        </title>
      </Helmet>
      <Header />
      <h1>{playlist.name}</h1>
      <h2>ID: {playlist.id}</h2>
      <h2>Description: {playlist.description}</h2>
    </>
  );
};

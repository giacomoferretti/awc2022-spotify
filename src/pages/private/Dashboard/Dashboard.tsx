import {
  EmojiSadIcon,
  PlusIcon,
  SearchCircleIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import { PlaylistSection } from "@/components/PlaylistSection";
import { useUsers } from "@/context";

import { WelcomeMessage } from "./WelcomeMessage";

const NoPlaylists = ({
  message,
  actionMessage,
  action,
}: {
  message: string;
  actionMessage: string;
  action: string;
}) => {
  return (
    <div className="flex items-center justify-center rounded border-2 border-dashed border-neutral-500 py-8 text-neutral-500">
      <EmojiSadIcon className="mr-4 h-8 w-8" />
      <div>
        <h2>{message}</h2>
        <Link to={action} className="cursor-pointer font-bold hover:underline">
          {actionMessage}
        </Link>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { getCurrentUser } = useUsers();

  const user = useMemo(() => getCurrentUser(), [getCurrentUser]);

  if (!user) return null;

  return (
    <>
      <Helmet>
        <title>Dashboard - {import.meta.env.VITE_SITE_TITLE}</title>
      </Helmet>

      <div className="pb-8">
        <WelcomeMessage />

        <section className="mt-4">
          <PlaylistSection
            title="Le tue playlist personali"
            playlists={user.personalPlaylists}
            empty={
              // <NoPlaylists
              //   message="Non hai nessuna playlist."
              //   actionMessage="Creane una!"
              //   action="/playlist/new"
              // />
              <Link to="/playlist/new">
                <div className="flex h-full min-h-[15em] w-40 flex-col items-center justify-center rounded border-2 border-dashed border-neutral-500 p-4 text-neutral-500 hover:border-neutral-400 hover:text-neutral-400">
                  <PlusIcon className="h-24 w-24 fill-current p-4" />
                  <span className="text-center">Crea nuova playlist</span>
                </div>
              </Link>
            }
            newAction={
              <Link to="/playlist/new">
                <div className="flex h-full min-h-[15em] w-40 flex-col items-center justify-center rounded border-2 border-dashed border-neutral-500 p-4 text-neutral-500 hover:border-neutral-400 hover:text-neutral-400">
                  <PlusIcon className="h-24 w-24 fill-current p-4" />
                  <span className="text-center">Crea nuova playlist</span>
                </div>
              </Link>
            }
          />
        </section>

        <section className="mt-4">
          <PlaylistSection
            title="Le tue playlist salvate"
            playlists={user.savedPlaylists}
            empty={
              // <NoPlaylists
              //   message="Non hai salvato nessuna playlist."
              //   actionMessage="Cercane una!"
              //   action="/search"
              // />
              <Link to="/search">
                <div className="flex h-full min-h-[15em] w-40 flex-col items-center justify-center rounded border-2 border-dashed border-neutral-500 p-4 text-neutral-500 hover:border-neutral-400 hover:text-neutral-400">
                  <SearchIcon className="h-24 w-24 stroke-current p-4" />
                  <span className="text-center">Cerca playlist</span>
                </div>
              </Link>
            }
            newAction={
              <Link to="/playlist/new">
                <div className="flex h-full min-h-[15em] w-40 flex-col items-center justify-center rounded border-2 border-dashed border-neutral-500 p-4 text-neutral-500 hover:border-neutral-400 hover:text-neutral-400">
                  <PlusIcon className="h-24 w-24 fill-current p-4" />
                  <span className="text-center">Crea nuova playlist</span>
                </div>
              </Link>
            }
          />
        </section>
      </div>
    </>
  );
};

export default Dashboard;

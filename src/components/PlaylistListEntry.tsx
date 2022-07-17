import classNames from "classnames";
import { Link } from "react-router-dom";

import noCoverImage from "@/assets/nocover.png";
import { Playlist } from "@/types";

export const PlaylistListEntry = ({ playlist }: { playlist: Playlist }) => {
  return (
    <Link to={`/playlist/${playlist.id}`}>
      <div className="w-40 rounded bg-neutral-800 p-4 hover:bg-neutral-700">
        <div className="relative mb-4">
          <div className={"w-full rounded bg-neutral-800 pb-[100%]"}>
            <img
              className="absolute h-full w-full rounded object-cover object-center"
              src={playlist.coverData ? playlist.coverData : noCoverImage}
            />
          </div>
        </div>
        <div className="min-h-[4em]">
          <div className="lin overflow-hidden overflow-ellipsis whitespace-nowrap font-bold">
            {playlist.name}
          </div>
          <div className="text-sm line-clamp-2">{playlist.description}</div>
        </div>
      </div>
    </Link>
  );
};

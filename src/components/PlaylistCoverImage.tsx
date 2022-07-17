import { CameraIcon, XIcon } from "@heroicons/react/outline";
import { useMemo } from "react";

import noCoverImage from "@/assets/nocover.png";
import { usePlaylists, useUsers } from "@/context";
import { Playlist } from "@/types";
import { readImageAsDataURL } from "@/utils";

import { InputWithLabel } from "./Input/InputWithLabel";

export const PlaylistCoverImage = ({ playlist }: { playlist: Playlist }) => {
  const { getCurrentUser } = useUsers();
  const { updateCoverData } = usePlaylists();

  const isOwner = useMemo(
    () => getCurrentUser()?.username === playlist.owner,
    [getCurrentUser, playlist.owner]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    readImageAsDataURL(event).then((result) => {
      updateCoverData(playlist.id, result);
    });
  };

  const removeCover = () => {
    updateCoverData(playlist.id, null);
  };

  return (
    <span className="block h-48 w-48 flex-shrink-0 self-end bg-neutral-800">
      <span className="relative block pb-[100%]">
        <img
          className="absolute h-full w-full transform-gpu object-cover object-center"
          src={playlist.coverData ? playlist.coverData : noCoverImage}
        />

        {isOwner && (
          <span className="group absolute flex h-full w-full flex-col items-center justify-center bg-neutral-900 bg-opacity-80 opacity-0 transition hover:opacity-100">
            <label
              htmlFor="coverUpload"
              className="flex w-full flex-1 translate-y-2  cursor-pointer flex-col items-center justify-center transition hover:underline group-hover:translate-y-0">
              <CameraIcon className="mx-auto h-6 w-6" />
              <span>Cambia copertina</span>
            </label>

            {playlist.coverData && (
              <>
                <hr className="h-1 w-3/6 translate-y-2 opacity-20 transition group-hover:translate-y-0" />
                <span
                  onClick={removeCover}
                  className="flex w-full flex-1 translate-y-2 cursor-pointer flex-col items-center justify-center transition hover:underline group-hover:translate-y-0">
                  <XIcon className="mx-auto h-6 w-6" />
                  <span>Rimuovi copertina</span>
                </span>
              </>
            )}

            <input
              id="coverUpload"
              className="hidden"
              accept="image/*"
              type="file"
              onChange={handleChange}
            />
          </span>
        )}
      </span>
    </span>
  );
};

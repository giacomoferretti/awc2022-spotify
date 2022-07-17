import { CameraIcon, PencilIcon, UserIcon } from "@heroicons/react/outline";
import { useMemo, useState } from "react";

import { UserProfilePicture } from "@/components/UserProfilePicture";
import { usePlaylists, useUsers } from "@/context";
import { User } from "@/types";
import { readImageAsDataURL } from "@/utils";

import { UserDetailsModal } from "./UserDetailsModal";

export const UserHeader = ({ user }: { user: User }) => {
  const { getPlaylistById } = usePlaylists();
  const { getCurrentUser } = useUsers();

  const publicPlaylistsCount = useMemo(
    () =>
      user.personalPlaylists.reduce((sum, track) => {
        return sum + (getPlaylistById(track).isPublic ? 1 : 0);
      }, 0),
    [getPlaylistById, user.personalPlaylists]
  );

  const isOwner = useMemo(
    () => getCurrentUser()?.username === user.username,
    [getCurrentUser, user.username]
  );

  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="flex gap-4">
        <UserProfilePicture user={user} />

        <div className="flex min-w-0 flex-1 flex-col justify-end">
          {/* Header */}
          {isOwner ? (
            <h2
              className="group flex items-end gap-4 hover:cursor-pointer"
              onClick={openDialog}>
              <button type="button">
                <span className="break-words py-1 text-left text-5xl font-bold line-clamp-3 group-hover:underline">
                  {user.displayName}
                </span>
              </button>
              <span>
                <PencilIcon
                  aria-hidden="true"
                  className="invisible h-10 w-10 group-hover:visible"
                />
              </span>
            </h2>
          ) : (
            <h2 className="break-words py-1 text-left text-5xl font-bold line-clamp-3">
              {user.displayName}
            </h2>
          )}

          {/* Metadata */}
          <div className="mt-2 flex flex-wrap text-sm">
            <span className="whitespace-nowrap">
              {publicPlaylistsCount} playlist pubbliche
            </span>
            <span
              data-before="•"
              className="whitespace-nowrap before:mx-1 before:content-[attr(data-before)]">
              {user.personalPlaylists.length - publicPlaylistsCount} playlist
              private
            </span>
          </div>
        </div>
      </div>

      <UserDetailsModal user={user} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

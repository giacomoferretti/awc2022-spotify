import { CameraIcon, UserIcon } from "@heroicons/react/outline";
import cx from "classnames";
import { useMemo } from "react";

import { useUsers } from "@/context";
import { User } from "@/types";
import { readImageAsDataURL } from "@/utils";

export const UserProfilePicture = ({ user }: { user: User }) => {
  const { getCurrentUser, updateProfilePicture } = useUsers();

  const isOwner = useMemo(
    () => getCurrentUser()?.username === user.username,
    [getCurrentUser, user.username]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    readImageAsDataURL(event).then((result) => {
      updateProfilePicture(user.username, result);
    });
  };

  return (
    <label>
      <span
        className={cx(
          "block h-32 w-32 overflow-hidden rounded-full bg-neutral-800 shadow-xl",
          { "cursor-pointer": isOwner }
        )}>
        <span className="relative block rounded-full pb-[100%]">
          {/* Image */}
          {user.pictureData ? (
            <img
              className="absolute h-full w-full transform-gpu rounded-full object-cover object-center"
              src={user.pictureData}
            />
          ) : (
            <UserIcon className="absolute h-full w-full stroke-neutral-400 p-8" />
          )}

          {/* Action */}
          {isOwner && (
            <span className="group absolute flex h-full w-full items-center justify-center rounded-full bg-neutral-900 bg-opacity-80 opacity-0 transition hover:opacity-100">
              <span className="translate-y-2 transition group-hover:translate-y-0">
                <CameraIcon className="mx-auto h-6 w-6" />
                <span>Cambia foto</span>
              </span>
            </span>
          )}
        </span>
      </span>

      {isOwner && (
        <input
          className="hidden"
          accept="image/*"
          type="file"
          onChange={handleChange}
        />
      )}
    </label>
  );
};

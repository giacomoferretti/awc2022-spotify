import { CameraIcon, UserIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Input } from "@/components/Input";
import { ValidationError } from "@/components/ValidationError";
import { useUsers } from "@/context";
import { NoMatch } from "@/pages/NoMatch";
import { readImageAsDataURL } from "@/utils";

type UserPreviewInputs = {
  displayName: string;
};

const UserProfilePicture = (props: React.ComponentPropsWithoutRef<"div">) => {
  const { className, children, ...rest } = props;

  return (
    <div
      className={classNames(
        "h-32 w-32 cursor-pointer overflow-hidden rounded-full bg-neutral-800 shadow-xl",
        className
      )}
      {...rest}>
      <div className="relative rounded-full pb-[100%]">{children}</div>
    </div>
  );
};

export const UserPreview = ({
  isActive,
  onFinish,
}: {
  isActive: boolean;
  onFinish: () => boolean;
}) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<UserPreviewInputs>({ mode: "onChange" });

  // const [photo, setPhoto] = useState<string | null>(null);

  const { getCurrentUser, updateProfilePicture, updateDisplayName } =
    useUsers();

  const user = getCurrentUser()!;
  const watchDisplayName = watch("displayName", user.displayName);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    readImageAsDataURL(event).then((result) => {
      updateProfilePicture(user.username, result);
    });
  };

  useEffect(() => {
    updateDisplayName(user.username, watchDisplayName);
  }, [watchDisplayName]);

  if (!user) return <NoMatch />;

  if (!isActive) return null;

  return (
    <>
      <form className="flex flex-col">
        <div className="flex gap-4">
          <label>
            <span className="block h-32 w-32 cursor-pointer overflow-hidden rounded-full bg-neutral-800 shadow-xl">
              <span className="relative block rounded-full pb-[100%]">
                {/* Image */}
                {user.pictureData ? (
                  <img
                    className="absolute h-full w-full transform-gpu rounded-full object-cover object-center"
                    src={user.pictureData}
                  />
                ) : (
                  <UserIcon className="absolute stroke-neutral-400 p-8" />
                )}

                {/* Action */}
                <span className="group absolute flex h-full w-full items-center justify-center rounded-full bg-neutral-900 bg-opacity-80 opacity-0 transition hover:opacity-100">
                  <span className="translate-y-2 transition group-hover:translate-y-0">
                    <CameraIcon className="mx-auto h-6 w-6" />
                    <span>Carica foto</span>
                  </span>
                </span>
              </span>
            </span>

            <input
              className="hidden"
              accept="image/*"
              type="file"
              onChange={handleChange}
            />
          </label>

          <div className="flex flex-1 flex-col justify-end">
            {/* <button type="button" onClick={openModal} title="Modifica dettagli"> */}
            <h2 className="w-full text-left text-5xl font-bold line-clamp-1">
              {watchDisplayName ? watchDisplayName : user.username}
            </h2>
            {/* </button> */}
            <div className="mt-2 flex flex-wrap text-sm">
              <span className="whitespace-nowrap">0 Playlist Pubbliche</span>
              <span
                data-before="•"
                className="whitespace-nowrap before:mx-1 before:content-[attr(data-before)]">
                0 Playlist Private
              </span>
            </div>
          </div>
        </div>

        {/* Fields */}
        <div className="mt-8 flex flex-1 flex-col justify-end gap-8">
          {/* Display name */}
          <div>
            <label>
              <span className="mb-2 block text-sm font-medium">
                Il tuo nome visualizzato
              </span>
              <Input
                id="displayName"
                placeholder="Il tuo nome visualizzato"
                defaultValue={user.displayName}
                aria-invalid={errors.displayName ? "true" : "false"}
                className={classNames(
                  "w-full transition duration-100 motion-reduce:transition-none",
                  {
                    "ring-2 ring-inset ring-spotify-error": errors.displayName,
                  }
                )}
                {...register("displayName", {
                  required: "Inserisci un nome visualizzato",
                })}
              />
            </label>
            {errors.displayName && (
              <ValidationError message={errors.displayName.message} />
            )}
          </div>
        </div>
      </form>
    </>
  );
};

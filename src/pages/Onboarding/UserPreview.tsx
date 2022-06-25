import { UserIcon } from "@heroicons/react/outline";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

import noCoverImage from "@/assets/nocover.png";
import { ValidationError } from "@/components/ValidationError";
import { useUsers } from "@/context";
import { Input } from "@/design/Input";
import { NoMatch } from "@/pages/NoMatch";

type UserPreviewInputs = {
  displayName: string;
};

export const UserPreview = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserPreviewInputs>({ mode: "onChange" });

  const { getCurrentUser } = useUsers();

  const user = useMemo(() => getCurrentUser(), []);
  if (!user) return <NoMatch />;

  const watchDisplayName = watch("displayName", user.displayName);

  return (
    <div className="flex gap-4">
      {/* User header*/}
      <div className="h-32 w-32 flex-shrink-0 rounded-full bg-neutral-800 shadow-xl">
        {/* Image */}
        <div className="relative pb-[100%]">
          {user.pictureData ? (
            <img
              className="absolute h-full w-full transform-gpu object-cover object-center"
              src={noCoverImage}
            />
          ) : (
            <UserIcon className="absolute stroke-neutral-400 p-8" />
          )}
        </div>
      </div>

      {/* Fields */}
      <div className="flex flex-1 flex-col justify-end gap-8">
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
              className="w-full"
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
    </div>
  );
};

export default UserPreview;

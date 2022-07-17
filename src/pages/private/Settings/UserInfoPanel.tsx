import { XIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { LoadingButton } from "@/components/Button";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input";
import { InputWithError } from "@/components/Input/InputWithError";
import { UserProfilePicture } from "@/components/UserProfilePicture";
import { ValidationError } from "@/components/ValidationError";
import { ValidationSuccess } from "@/components/ValidationSuccess";
import { useUsers } from "@/context";
import NoMatch from "@/pages/NoMatch";
import { wait } from "@/utils";

type UserSettingsInputs = {
  displayName: string;
  email: string;
};

export const UserInfoPanel = () => {
  const {
    getCurrentUser,
    updateDisplayName,
    updateProfilePicture,
    updateEmail,
  } = useUsers();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserSettingsInputs>({ mode: "onChange" });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit: SubmitHandler<UserSettingsInputs> = async (data) => {
    setIsLoading(true);

    if (import.meta.env.DEV) await wait(1000);

    updateDisplayName(user.username, data.displayName);
    updateEmail(user.username, data.email);

    setIsSuccess(true);
    setIsLoading(false);
  };

  const removePhoto = () => {
    updateProfilePicture(user.username, null);
  };

  const user = getCurrentUser()!;

  if (!user) return <NoMatch />;

  return (
    <>
      <h2 className="text-xl font-bold">Modifica informazioni account</h2>
      <form
        className="mt-4 flex max-w-xl flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-4">
          <UserProfilePicture user={user} />
          <button
            type="button"
            onClick={removePhoto}
            title="Elimina playlist"
            className="mb-2 flex items-center gap-2 text-red-400 hover:underline">
            <XIcon aria-hidden="true" className="h-4 w-4" /> Rimuovi foto
          </button>
        </div>

        <InputWithError
          label="Il tuo nome visualizzato"
          errors={
            errors.displayName && (
              <ValidationError message={errors.displayName.message} />
            )
          }>
          <Input
            placeholder="Il tuo nome visualizzato"
            defaultValue={user.displayName}
            aria-invalid={errors.displayName ? "true" : "false"}
            className={classNames("w-full", {
              "ring-2 ring-inset ring-spotify-error": errors.displayName,
            })}
            {...register("displayName", {
              required: "Inserisci un nome visualizzato",
            })}
          />
        </InputWithError>

        <InputWithError
          label="La tua email"
          errors={
            errors.email && <ValidationError message={errors.email.message} />
          }>
          <Input
            type="email"
            placeholder="La tua email"
            defaultValue={user.email}
            aria-invalid={errors.email ? "true" : "false"}
            className={classNames("w-full", {
              "ring-2 ring-inset ring-spotify-error": errors.email,
            })}
            {...register("email", {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email non valida",
              },
              required: "Inserisci una email",
            })}
          />
        </InputWithError>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <LoadingButton type="submit" variant="primary" isLoading={isLoading}>
            Salva
          </LoadingButton>
          {isSuccess && (
            <ValidationSuccess message="Dati aggiornati correttamente." />
          )}
        </div>
      </form>
    </>
  );
};

// {/* Display name */}
// <div>
// <label>
//   <span className="mb-2 block text-sm font-medium">
//     Il tuo nome visualizzato
//   </span>
//   <Input
//     id="displayName"
//     placeholder="Il tuo nome visualizzato"
//     defaultValue={user.displayName}
//     aria-invalid={errors.displayName ? "true" : "false"}
//     className={classNames(
//       "w-full transition duration-100 motion-reduce:transition-none",
//       {
//         "ring-2 ring-inset ring-spotify-error": errors.displayName,
//       }
//     )}
//     {...register("displayName", {
//       required: "Inserisci un nome visualizzato",
//     })}
//   />
// </label>
// {errors.displayName && (
//   <ValidationError message={errors.displayName.message} />
// )}
// </div>

// {/* Email */}
// <div>
// <label>
//   <span className="mb-2 block text-sm font-medium">
//     La tua email
//   </span>
//   <Input
//     id="email"
//     type="email"
//     placeholder="La tua email"
//     defaultValue={user.email}
//     aria-invalid={errors.email ? "true" : "false"}
//     className={classNames(
//       "w-full transition duration-100 motion-reduce:transition-none",
//       {
//         "ring-2 ring-inset ring-spotify-error": errors.email,
//       }
//     )}
//     {...register("email", {
//       pattern: {
//         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//         message: "Email non valida",
//       },
//       required: "Inserisci una email",
//     })}
//   />
// </label>
// {errors.email && <ValidationError message={errors.email.message} />}
// </div>

import classNames from "classnames";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/Button/Button";
import { ValidationError } from "@/components/ValidationError";
import { useUsers } from "@/context";
import { Input } from "@/design/Input";

import NoMatch from "../NoMatch";

type UserSettingsInputs = {
  displayName: string;
  email: string;
};

export const UserInfoPanel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSettingsInputs>({ mode: "onChange" });

  const onSubmit: SubmitHandler<UserSettingsInputs> = async (data) => {
    console.log("submitted!");
  };

  const { getCurrentUser } = useUsers();
  const user = getCurrentUser()!;

  if (!user) return <NoMatch />;

  return (
    <div>
      <h2>Modifica informazioni account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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

          {/* Email */}
          <div>
            <label>
              <span className="mb-2 block text-sm font-medium">
                La tua email
              </span>
              <Input
                id="email"
                type="email"
                placeholder="La tua email"
                defaultValue={user.email}
                aria-invalid={errors.email ? "true" : "false"}
                className={classNames(
                  "w-full transition duration-100 motion-reduce:transition-none",
                  {
                    "ring-2 ring-inset ring-spotify-error": errors.email,
                  }
                )}
                {...register("email", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email non valida",
                  },
                  required: "Inserisci una email",
                })}
              />
            </label>
            {errors.email && <ValidationError message={errors.email.message} />}
          </div>
        </div>

        <Button type="submit" variant="primary">
          Salva
        </Button>
      </form>
    </div>
  );
};

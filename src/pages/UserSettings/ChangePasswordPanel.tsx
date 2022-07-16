import classNames from "classnames";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button, LoadingButton } from "@/components/Button";
import { Input } from "@/components/Input";
import { PasswordInput } from "@/components/Input/PasswordInput";
import { ValidationError } from "@/components/ValidationError";
import { useUsers } from "@/context";

import NoMatch from "../NoMatch";

type ChangePasswordInputs = {
  currentPassword: string;
  newPassword: string;
};

export const ChangePasswordPanel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordInputs>({ mode: "onChange" });

  const onSubmit: SubmitHandler<ChangePasswordInputs> = async (data) => {
    console.log("submitted!");
  };

  const [isLoading, setIsLoading] = useState(false);

  const { getCurrentUser } = useUsers();
  const user = getCurrentUser()!;

  if (!user) return <NoMatch />;

  return (
    <>
      <h2>Cambia password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Fields */}
        <div className="mt-8 flex flex-1 flex-col justify-end gap-8">
          <PasswordInput
            // label="La tua password"
            id="currentPassword"
            type="password"
            placeholder="Inserisci la tua password."
            aria-invalid={errors.currentPassword ? "true" : "false"}
            {...register("currentPassword", {
              minLength: {
                value: 8,
                message: "Per la tua password utilizza almeno 8 caratteri.",
              },
              required: "Inserisci una password",
            })}
          />
          {errors.currentPassword && (
            <ValidationError message={errors.currentPassword.message} />
          )}
        </div>

        <LoadingButton isLoading={isLoading} type="submit" variant="primary">
          Salva
        </LoadingButton>
      </form>
    </>
  );
};

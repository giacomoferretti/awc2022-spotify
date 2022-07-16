import classNames from "classnames";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button, LoadingButton } from "@/components/Button";
import { Input } from "@/components/Input";
import { InputWithError } from "@/components/Input/InputWithError";
import { PasswordInput } from "@/components/Input/PasswordInput";
import { ValidationError } from "@/components/ValidationError";
import { ValidationSuccess } from "@/components/ValidationSuccess";
import { useUsers } from "@/context";
import { wait } from "@/utils";

import NoMatch from "../NoMatch";

type ChangePasswordInputs = {
  currentPassword: string;
  newPassword: string;
};

export const ChangePasswordPanel = () => {
  const { getCurrentUser, updatePassword } = useUsers();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordInputs>({ mode: "onChange" });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const user = getCurrentUser()!;

  const onSubmit: SubmitHandler<ChangePasswordInputs> = async (data) => {
    if (import.meta.env.DEV) await wait(500);

    updatePassword(user.username, data.newPassword);

    setIsSuccess(true);

    reset();
  };

  const currentPassword = useRef({});
  currentPassword.current = watch("currentPassword", "");

  if (!user) return <NoMatch />;

  return (
    <>
      <h2 className="text-xl font-bold">Cambia password</h2>
      <form
        className="mt-4 flex max-w-xl flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}>
        <InputWithError
          label="La tua password attuale"
          errors={
            errors.currentPassword && (
              <ValidationError message={errors.currentPassword.message} />
            )
          }>
          <PasswordInput
            aria-invalid={errors.currentPassword ? "true" : "false"}
            {...register("currentPassword", {
              minLength: {
                value: 8,
                message: "La tua password deve contenere almeno 8 caratteri.",
              },
              required: "Inserisci una password",
              validate: {
                checkCorrectPassword: (v) =>
                  v === user.password || "La password non è corretta",
              },
            })}
          />
        </InputWithError>
        <InputWithError
          label="La tua nuova password"
          errors={
            errors.newPassword && (
              <ValidationError message={errors.newPassword.message} />
            )
          }>
          <PasswordInput
            aria-invalid={errors.newPassword ? "true" : "false"}
            {...register("newPassword", {
              minLength: {
                value: 8,
                message: "La tua password deve contenere almeno 8 caratteri.",
              },
              required: "Inserisci una password",

              validate: {
                checkSamePassword: (v) =>
                  v !== currentPassword.current ||
                  "La nuova password non può essere uguale a quella vecchia.",
              },
            })}
          />
        </InputWithError>
        <div className="flex items-center gap-4">
          <LoadingButton type="submit" variant="primary" isLoading={isLoading}>
            Cambia password
          </LoadingButton>
          {isSuccess && (
            <ValidationSuccess message="Password cambiata correttamente." />
          )}
        </div>
      </form>
    </>
  );
};

import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import cx from "classnames";
import { useState } from "react";
import {
  DeepMap,
  FieldError,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

import { BaseInput, BaseInputProps } from "./BaseInput";

type FormInputProps<TFormValues> = BaseInputProps & {
  name: Path<TFormValues>;
  register: UseFormRegister<TFormValues>;
  rules?: RegisterOptions;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
};

export const PassInput = <TFormValues extends Record<string, unknown>>(
  props: FormInputProps<TFormValues>
) => {
  const { register, rules, name, errors, ...rest } = props;
  const hasError = errors && errors[name];

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPasswordShown(!passwordShown);
  };

  return (
    <div
      className={cx(
        "flex rounded bg-neutral-800 transition duration-100 focus-within:ring-2 focus-within:ring-inset",
        { "focus-within:ring-green-500": !hasError },
        { "focus-within:ring-red-500": hasError }
      )}>
      <BaseInput
        {...rest}
        type={passwordShown ? "text" : "password"}
        className="flex-1 bg-transparent pr-0 focus:ring-0"
        placeholder="Inserisci la tua password."
        aria-invalid={hasError ? "true" : "false"}
        hasErrors={hasError ? true : false}
        {...register(name, {
          minLength: {
            value: 8,
            message: "La tua password deve contenere almeno 8 caratteri.",
          },
          required: "Inserisci una password",
          ...rules,
        })}
      />
      <button
        className="h-10 w-10 flex-shrink-0 p-2.5 text-neutral-300"
        onClick={togglePassword}
        type="button">
        {passwordShown ? <EyeIcon /> : <EyeOffIcon />}
      </button>
    </div>
  );
};

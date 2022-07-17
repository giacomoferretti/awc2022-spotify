import {
  DeepMap,
  FieldError,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

import { useUsers } from "@/context";

import { BaseInput, BaseInputProps } from "./BaseInput";

type FormInputProps<TFormValues> = BaseInputProps & {
  name: Path<TFormValues>;
  register: UseFormRegister<TFormValues>;
  rules?: RegisterOptions;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
};

export const UsernameInput = <TFormValues extends Record<string, unknown>>(
  props: FormInputProps<TFormValues>
) => {
  const { register, rules, name, errors, ...rest } = props;
  const hasError = errors && errors[name];

  return (
    <BaseInput
      {...rest}
      placeholder="Inserisci il tuo username."
      aria-invalid={hasError ? "true" : "false"}
      hasErrors={hasError ? true : false}
      {...register(name, {
        pattern: {
          value: /^[a-z0-9._]+$/i,
          message:
            "Sono consentiti solo lettere (a-z), numeri (0-9), punti (.) e i trattini bassi (_)",
        },
        required: "Inserisci un nome utente",
        ...rules,
      })}
    />
  );
};

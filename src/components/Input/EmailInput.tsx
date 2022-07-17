import { DeepMap, FieldError, Path, UseFormRegister } from "react-hook-form";

import { BaseInput, BaseInputProps } from "./BaseInput";

type FormInputProps<TFormValues> = BaseInputProps & {
  name: Path<TFormValues>;
  register: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
};

export const EmailInput = <TFormValues extends Record<string, unknown>>(
  props: FormInputProps<TFormValues>
) => {
  const { register, name, errors, placeholder, ...rest } = props;

  const hasError = errors && errors[name];

  console.log("hasError", hasError ? true : false);

  return (
    <BaseInput
      {...rest}
      type="email"
      placeholder={placeholder ? placeholder : "La tua email"}
      aria-invalid={hasError ? "true" : "false"}
      hasErrors={hasError ? true : false}
      {...register(name, {
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Email non valida",
        },
        required: "Inserisci una email",
      })}
    />
  );
};

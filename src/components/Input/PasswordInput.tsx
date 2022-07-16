import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { forwardRef, useState } from "react";

import { Input } from "./Input";

type PasswordInputProps = React.ComponentPropsWithoutRef<"input">;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    const { type = "password", ...rest } = props;

    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = (e: React.PointerEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setPasswordShown(!passwordShown);
    };

    return (
      <div className="flex rounded bg-neutral-800 transition focus-within:ring-2 focus-within:ring-inset focus-within:ring-spotify-accent-base">
        <Input
          ref={ref}
          type={passwordShown ? "text" : type}
          className="bg-transparent pr-0 focus:ring-0"
          {...rest}
        />
        <button
          className="h-10 w-10 flex-shrink-0 p-2.5 text-neutral-300"
          onClick={togglePassword}
          type="button">
          {passwordShown ? <EyeIcon /> : <EyeOffIcon />}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

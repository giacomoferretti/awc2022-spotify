import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  forwardRef,
  useState,
} from "react";

type ButtonInputProps = {
  id: string;
  label: string;
  placeholder: string;
  className?: string;
  type?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const PasswordInput = forwardRef<HTMLInputElement, ButtonInputProps>(
  ({ id, label, placeholder, className, type = "text", ...props }, ref) => {
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = (e: React.PointerEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setPasswordShown(!passwordShown);
    };

    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="mb-2 text-sm font-medium">
          {label}
        </label>
        <div
          className={classNames(
            "flex rounded border-0 bg-[#ffffff1a] text-[#ffffffb3] focus-within:border-spotify-accent-base focus-within:ring-2 focus-within:ring-inset focus-within:ring-spotify-accent-base",
            className
          )}>
          <input
            id={id}
            ref={ref}
            type={passwordShown ? "text" : type}
            className="flex-1 rounded border-none bg-transparent p-2.5 pr-0 text-sm placeholder:text-[#ffffffb3] focus:outline-none focus:ring-0"
            placeholder={placeholder}
            {...props}
          />
          <button
            className="h-10 w-10 p-2.5"
            onClick={togglePassword}
            type="button">
            {passwordShown ? <EyeIcon /> : <EyeOffIcon />}
          </button>
        </div>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

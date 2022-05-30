import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
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
            "flex border-0 rounded bg-[#ffffff1a] text-[#ffffffb3] focus-within:ring-inset focus-within:ring-2 focus-within:ring-spotify-accent-base focus-within:border-spotify-accent-base",
            className
          )}>
          <input
            id={id}
            ref={ref}
            type={passwordShown ? "text" : type}
            className="flex-1 text-sm p-2.5 pr-0 border-none focus:ring-0 focus:outline-none bg-transparent placeholder:text-[#ffffffb3]"
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

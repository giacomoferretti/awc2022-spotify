import classNames from "classnames";
import { forwardRef } from "react";

export type InputProps = React.ComponentPropsWithoutRef<"input">;

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <input
      ref={ref}
      type="text"
      className={classNames(
        "rounded border-0 bg-neutral-800 p-2.5 text-sm text-neutral-300 transition duration-100 placeholder:text-neutral-300 focus:ring-2 focus:ring-inset focus:ring-spotify-accent-base",
        className
      )}
      {...rest}
    />
  );
});

Input.displayName = "Input";

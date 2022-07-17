import classNames from "classnames";
import { forwardRef } from "react";

export type BaseInputProps = React.ComponentPropsWithoutRef<"input"> & {
  hasErrors?: boolean;
};

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  (props, ref) => {
    const { hasErrors, className, ...rest } = props;

    return (
      <input
        ref={ref}
        type="text"
        className={classNames(
          "rounded border-0 bg-neutral-800 p-2.5 text-sm text-neutral-300 transition duration-200 placeholder:text-neutral-300 focus:ring-2 focus:ring-inset",
          { "focus:ring-green-500": !hasErrors },
          { "focus:ring-red-500": hasErrors },
          className
        )}
        {...rest}
      />
    );
  }
);

BaseInput.displayName = "BaseInput";

export default BaseInput;

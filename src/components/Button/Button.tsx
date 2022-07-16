import classNames from "classnames";

type PrimaryButton = {
  variant: "primary";
};

type SecondaryButton = {
  variant: "secondary";
};

type TertiaryButton = {
  variant: "tertiary";
};

type Button = PrimaryButton | SecondaryButton | TertiaryButton;

export type ButtonProps = React.ComponentPropsWithoutRef<"button"> & Button;

export const Button = (props: ButtonProps) => {
  const { variant, ...rest } = props;

  return (
    <button
      type="button"
      {...rest}
      className={classNames(
        "rounded-full border py-3 font-bold",
        {
          "border-transparent": variant === "primary" || variant === "tertiary",
          "border-neutral-500 enabled:hover:border-white disabled:text-neutral-500":
            variant === "secondary",
        },
        {
          "px-8": variant === "primary" || variant === "secondary",
          "px-4": variant === "tertiary",
        },
        {
          "bg-spotify-accent-base text-black hover:bg-spotify-accent-highlight":
            variant === "primary",
        },
        rest.className
      )}>
      {rest.children}
    </button>
  );
};

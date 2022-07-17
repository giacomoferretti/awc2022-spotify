import cx from "classnames";

import BaseButton, { BaseButtonProps } from "./BaseButton";

const mapVariant = {
  primary:
    "border border-transparent bg-green-500 text-black hover:bg-green-400 focus:ring-green-800",
  danger:
    "border border-transparent bg-red-500 text-black hover:bg-red-400 focus:ring-red-800",
  transparent: "border border-transparent focus:ring-neutral-600",
};

type ButtonSolidProps<C extends React.ElementType> = {
  variant: "primary" | "danger" | "transparent";
} & BaseButtonProps<C>;

const ButtonSolid = <C extends React.ElementType>(
  props: ButtonSolidProps<C>
) => {
  const { variant = "primary", className, ...rest } = props;
  return (
    <BaseButton {...rest} className={cx("", mapVariant[variant], className)} />
  );
};

export default ButtonSolid;

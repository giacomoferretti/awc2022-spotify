import cx from "classnames";

import BaseButton, { BaseButtonProps } from "./BaseButton";

const mapVariant = {
  primary:
    "border border-neutral-500 hover:border-white focus:ring-neutral-700",
};

type ButtonOutlineProps<C extends React.ElementType> = {
  variant: "primary";
} & BaseButtonProps<C>;

const ButtonOutline = <C extends React.ElementType>(
  props: ButtonOutlineProps<C>
) => {
  const { variant = "primary", className, ...rest } = props;
  return (
    <BaseButton {...rest} className={cx("", mapVariant[variant], className)} />
  );
};

export default ButtonOutline;

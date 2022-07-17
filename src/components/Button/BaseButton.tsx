import cx from "classnames";

const mapSize = {
  small: "px-2 py-1 text-xs",
  base: "px-4 py-2 text-base",
  large: "px-6 py-3 text-xl",
};

const mapShape = {
  normal: "rounded",
  rounded: "rounded-full px-8",
};

export type BaseButtonProps<C extends React.ElementType> = {
  as?: C;
  size?: "small" | "base" | "large";
  shape?: "normal" | "rounded";
} & React.ComponentPropsWithoutRef<C>;

const BaseButton = <C extends React.ElementType = "button">(
  props: BaseButtonProps<C>
) => {
  const {
    as: Component = "button",
    size = "base",
    shape = "normal",
    className,
    ...rest
  } = props;

  return (
    <Component
      {...rest}
      className={cx(
        "flex items-center justify-center font-medium ring-offset-transparent transition duration-200 focus:outline-none focus:ring-4",
        mapSize[size],
        mapShape[shape],
        className
      )}
    />
  );
};

export default BaseButton;

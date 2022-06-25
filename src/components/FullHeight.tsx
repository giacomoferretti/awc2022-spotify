import classNames from "classnames";

type FullHeightProps = {
  children: React.ReactNode;
};

export const FullHeight = ({
  children,
  ...props
}: FullHeightProps & React.HTMLProps<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={classNames(
        "flex min-h-full items-center justify-center",
        props.className
      )}>
      {children}
    </div>
  );
};

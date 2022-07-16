import { Spinner } from "../Spinner";
import { Button, ButtonProps } from "./Button";

type LoadingButton = {
  isLoading: boolean;
};

type LoadingButtonProps = ButtonProps & LoadingButton;

export const LoadingButton = (props: LoadingButtonProps) => {
  const { isLoading, children, ...rest } = props;

  console.log("isLoading", isLoading); // TODO: remove this

  return (
    <Button
      disabled={isLoading}
      className="flex items-center self-center"
      {...rest}>
      {isLoading && <Spinner className="-ml-1 mr-3 h-5 w-5 animate-spin" />}
      {children}
    </Button>
  );
};

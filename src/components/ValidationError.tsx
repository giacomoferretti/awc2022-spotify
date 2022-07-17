import { ExclamationCircleIcon } from "@heroicons/react/outline";

type ValidationErrorProps = {
  message?: string;
};

export const ValidationError = ({ message }: ValidationErrorProps) => {
  return (
    <span role="alert" className="mt-2 flex space-x-1 text-sm text-red-500">
      <ExclamationCircleIcon className="h-5 w-5 flex-shrink-0" />
      <span>{message ? message : "Errore sconosciuto"}</span>
    </span>
  );
};

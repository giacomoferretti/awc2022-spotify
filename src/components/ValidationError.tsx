import { ExclamationCircleIcon } from "@heroicons/react/outline";

type ValidationErrorProps = {
  message?: string;
};

export const ValidationError = ({ message }: ValidationErrorProps) => {
  return (
    <span
      role="alert"
      className="flex text-sm mt-2 text-spotify-error space-x-1">
      <ExclamationCircleIcon className="flex-shrink-0 h-5 w-5" />
      <span>{message ? message : "Errore sconosciuto"}</span>
    </span>
  );
};

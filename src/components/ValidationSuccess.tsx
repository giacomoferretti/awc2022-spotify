import { CheckCircleIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";

type ValidationSuccessProps = {
  message?: string;
};

export const ValidationSuccess = ({ message }: ValidationSuccessProps) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  if (!show) {
    return null;
  }

  return (
    <span
      role="alert"
      className="flex space-x-1 text-sm text-spotify-accent-base">
      <CheckCircleIcon className="h-5 w-5 flex-shrink-0" />
      <span>{message ? message : "Errore sconosciuto"}</span>
    </span>
  );
};

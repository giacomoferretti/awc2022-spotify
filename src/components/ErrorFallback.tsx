import { EmojiSadIcon } from "@heroicons/react/outline";
import { FallbackProps } from "react-error-boundary";

export const ErrorFallback = ({ error }: FallbackProps) => {
  return (
    <div className="flex min-h-full items-center justify-center p-8">
      <div className="min-w-0 max-w-xl rounded-xl border border-neutral-800 p-8">
        <p className="mb-4 flex items-center gap-4">
          <EmojiSadIcon className="h-8 w-8 stroke-neutral-700" />
          Something went wrong:
        </p>
        <pre className="whitespace-pre-wrap break-all rounded bg-neutral-800 p-4">
          {error.stack}
        </pre>
        {/* <button onClick={resetErrorBoundary}>Try again</button> */}
      </div>
    </div>
  );
};

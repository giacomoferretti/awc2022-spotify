import { PencilIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

export const FlexDebug = () => {
  const [text, setText] = useState("Untitled playlist");

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <>
      <Helmet>
        <title>Flex Debug</title>
      </Helmet>

      <div className="p-4">
        <input
          type="text"
          className="mb-4 rounded border-0 bg-neutral-800"
          onChange={onChangeHandler}
        />

        <div className="flex items-center gap-4">
          <span className="overflow-hidden overflow-ellipsis whitespace-nowrap text-5xl font-bold">
            {text}
          </span>
          <div>
            <PencilIcon className="h-10 w-10" />
          </div>
        </div>
      </div>
    </>
  );
};

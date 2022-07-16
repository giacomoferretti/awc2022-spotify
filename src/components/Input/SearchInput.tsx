import { SearchIcon, XIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import { forwardRef } from "react";

import { Input } from "./Input";

type Search = {
  onChangeValue: (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  displayClearButton: () => boolean;
  clearButton: (event: React.PointerEvent<HTMLButtonElement>) => void;
};

type SearchInputProps = React.ComponentPropsWithoutRef<"input"> & Search;

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (props, ref) => {
    const {
      onChangeValue,
      displayClearButton,
      clearButton,
      className,
      ...rest
    } = props;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChangeValue(event.currentTarget.value, event);
    };

    return (
      <div className="relative">
        <Input
          ref={ref}
          onChange={handleChange}
          className={classNames("px-10", className)}
          {...rest}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center">
          <span className="flex-1 pl-3">
            <SearchIcon
              className="h-5 w-5 text-neutral-300"
              aria-hidden="true"
            />
          </span>
          {displayClearButton() && (
            <button
              onPointerDown={clearButton}
              className="pointer-events-auto px-2.5 text-neutral-300 hover:text-white">
              <XIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

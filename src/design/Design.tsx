import React, { useState } from "react";

import { Input, PasswordInput } from "@/components/Input";
import { InputWithError } from "@/components/Input/InputWithError";
import { InputWithLabel } from "@/components/Input/InputWithLabel";
import { SearchInput } from "@/components/Input/SearchInput";
import { ValidationError } from "@/components/ValidationError";

import { Button } from "../components/Button/Button";

const Section = ({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <>
      <hr className="my-4" />
      <h2>{title}</h2>
      {children}
    </>
  );
};

const ButtonSection = () => {
  return (
    <Section title="Buttons">
      <div className="mt-4 flex flex-col items-start gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
      </div>
    </Section>
  );
};

const InputSection = () => {
  const [query, setQuery] = useState("");

  const onChangeHandler = (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuery(value);
  };

  const showClearButton = () => {
    return query != null && query !== "";
  };

  const clearInput = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setQuery("");
  };

  return (
    <Section title="Inputs">
      <div className="mt-4 flex flex-col items-start gap-4">
        <Input placeholder="Input" />
        <PasswordInput placeholder="PasswordInput" />
      </div>
      <div className="mt-4 flex flex-col items-start gap-4">
        <InputWithLabel label="Example label">
          <Input placeholder="Input" />
        </InputWithLabel>
      </div>
      <div className="mt-4 flex flex-col items-start gap-4">
        <InputWithError
          label="Example label"
          errors={<ValidationError message="Bruh" />}>
          <Input placeholder="Input" />
        </InputWithError>
      </div>
      <SearchInput
        className="w-full"
        autoComplete="off"
        placeholder="Cerca un artista"
        value={query}
        onChangeValue={onChangeHandler}
        displayClearButton={showClearButton}
        clearButton={clearInput}
      />
    </Section>
  );
};

export const Design = () => {
  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Design</h1>

        <ButtonSection />

        <InputSection />
      </div>
    </>
  );
};

import React from "react";

export const InputWithError = ({
  label,
  children,
  errors,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
  errors: React.ReactNode;
}) => {
  return (
    <div>
      <label>
        <span className="mb-2 block text-sm font-medium">{label}</span>
        {children}
      </label>
      {errors}
    </div>
  );
};

import React from "react";

export const InputWithLabel = ({
  label,
  children,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <label>
        <span className="mb-2 block text-sm font-medium">{label}</span>
        {children}
      </label>
    </div>
  );
};

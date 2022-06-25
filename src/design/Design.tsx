import { Button } from "./Button";

export const Design = () => {
  return (
    <>
      <div className="p-4">
        <h1>Design</h1>
        <div className="mt-4 flex items-center gap-4">
          <Button className="bg-red-500" variant="primary">
            Primary
          </Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
        </div>
      </div>
    </>
  );
};

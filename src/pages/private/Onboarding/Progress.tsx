export const Progress = ({ progress }: { progress: number }) => {
  return (
    <div className="h-1.5 w-full rounded-full bg-neutral-700">
      <div
        className="h-1.5 rounded-full bg-spotify-accent-base transition-[width] duration-500"
        style={{ width: `${progress}%` }}></div>
    </div>
  );
};

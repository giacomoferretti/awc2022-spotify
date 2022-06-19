import { PlaylistsProvider, TracksProvider, UsersProvider } from "@/context";

export const StorageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UsersProvider>
      <PlaylistsProvider>
        <TracksProvider>{children}</TracksProvider>
      </PlaylistsProvider>
    </UsersProvider>
  );
};

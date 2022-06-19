import { Helmet } from "react-helmet-async";

import { useUsers } from "@/context";

const AddUserForm = () => {
  const { addUser } = useUsers();

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = (
      e.currentTarget.elements.namedItem("username") as HTMLInputElement
    ).value;
    const password = (
      e.currentTarget.elements.namedItem("password") as HTMLInputElement
    ).value;
    const email = (
      e.currentTarget.elements.namedItem("email") as HTMLInputElement
    ).value;

    addUser({
      username,
      password,
      email,
      displayName: username,
      personalPlaylists: [],
      savedPlaylists: [],
      favoriteArtists: [],
      favoriteGenres: [],
    });

    e.currentTarget.reset();
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmitHandler}>
      <label>
        <span className="mb-2 block text-sm font-medium">Il tuo username</span>
        <input
          id="username"
          type="text"
          placeholder="Inserisci il tuo username."
          className="w-full rounded border-0 bg-[#ffffff1a] p-2.5 text-sm text-[#ffffffb3] placeholder:text-[#ffffffb3] focus:border-spotify-accent-base focus:ring-2 focus:ring-inset focus:ring-spotify-accent-base"
        />
      </label>
      <label>
        <span className="mb-2 block text-sm font-medium">La tua password</span>
        <input
          id="password"
          type="text"
          placeholder="Inserisci la tua password."
          className="w-full rounded border-0 bg-[#ffffff1a] p-2.5 text-sm text-[#ffffffb3] placeholder:text-[#ffffffb3] focus:border-spotify-accent-base focus:ring-2 focus:ring-inset focus:ring-spotify-accent-base"
        />
      </label>
      <label>
        <span className="mb-2 block text-sm font-medium">La tua email</span>
        <input
          id="email"
          type="email"
          placeholder="Inserisci la tua email."
          className="w-full rounded border-0 bg-[#ffffff1a] p-2.5 text-sm text-[#ffffffb3] placeholder:text-[#ffffffb3] focus:border-spotify-accent-base focus:ring-2 focus:ring-inset focus:ring-spotify-accent-base"
        />
      </label>
      <button
        type="submit"
        className="self-center rounded-full bg-spotify-accent-base py-3 px-8 font-bold text-black hover:bg-spotify-accent-highlight">
        Add user
      </button>
    </form>
  );
};

const RemoveUserForm = () => {
  const { users, removeUserByUsername } = useUsers();

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = (
      e.currentTarget.elements.namedItem("username") as HTMLInputElement
    ).value;
    console.log(username);

    removeUserByUsername(username);

    e.currentTarget.reset();
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmitHandler}>
      <label>
        <span className="mb-2 block text-sm font-medium">Utente</span>
        <select
          id="username"
          className="w-full rounded border-0 bg-[#2f2f2f] focus:border-spotify-accent-base focus:ring-2 focus:ring-inset focus:ring-spotify-accent-base"
          disabled={Object.keys(users).length === 0}>
          {Object.keys(users).length > 0 ? (
            Object.entries(users).map(([username]) => (
              <option key={username} value={username}>
                {username}
              </option>
            ))
          ) : (
            <option value="">No user available</option>
          )}
        </select>
      </label>
      <button
        type="submit"
        className="self-center rounded-full bg-spotify-error py-3 px-8 font-bold text-black">
        Remove user
      </button>
    </form>
  );
};

const ListUsers = () => {
  const { users } = useUsers();

  return (
    <ul>
      {Object.keys(users).length > 0 ? (
        Object.entries(users).map(([, user]) => (
          <li key={user.username}>{user.username}</li>
        ))
      ) : (
        <h2>No user available</h2>
      )}
    </ul>
  );
};

export const AuthDebug = () => {
  return (
    <>
      <Helmet>
        <title>Auth Debug</title>
      </Helmet>
      <div className="max-w-lg p-4">
        <h2 className="mb-4 text-4xl font-bold">Add user</h2>
        <AddUserForm />
      </div>
      <div className="max-w-lg p-4">
        <h2 className="mb-4 text-4xl font-bold">Remove user</h2>
        <RemoveUserForm />
      </div>
      <div className="max-w-lg p-4">
        <h2 className="mb-4 text-4xl font-bold">List users</h2>
        <ListUsers />
      </div>
    </>
  );
};

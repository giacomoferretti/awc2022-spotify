import { Helmet } from "react-helmet-async";

import { useUsers } from "@/context/usersContext";

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

    console.table({ username, password });

    addUser({
      username,
      password,
      email: "",
      favoriteArtists: [],
      favoriteGenres: [],
    });

    e.currentTarget.reset();
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmitHandler}>
      <label>
        <span className="block mb-2 text-sm font-medium">Il tuo username</span>
        <input
          id="username"
          type="text"
          placeholder="Inserisci il tuo username."
          className="w-full p-2.5 text-sm rounded border-0 bg-[#ffffff1a] text-[#ffffffb3] placeholder:text-[#ffffffb3] focus:ring-inset focus:ring-2 focus:ring-spotify-accent-base focus:border-spotify-accent-base"
        />
      </label>
      <label>
        <span className="block mb-2 text-sm font-medium">La tua password</span>
        <input
          id="password"
          type="text"
          placeholder="Inserisci la tua password."
          className="w-full p-2.5 text-sm rounded border-0 bg-[#ffffff1a] text-[#ffffffb3] placeholder:text-[#ffffffb3] focus:ring-inset focus:ring-2 focus:ring-spotify-accent-base focus:border-spotify-accent-base"
        />
      </label>
      <button
        type="submit"
        className="bg-spotify-accent-base hover:bg-spotify-accent-highlight py-3 px-8 rounded-full text-black font-bold self-center">
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
        <span className="block mb-2 text-sm font-medium">Utente</span>
        <select
          id="username"
          className="w-full bg-[#2f2f2f] border-0 rounded focus:ring-inset focus:ring-2 focus:ring-spotify-accent-base focus:border-spotify-accent-base"
          disabled={users.length === 0}>
          {users.length > 0 ? (
            users.map((user) => (
              <option key={user.username} value={user.username}>
                {user.username}
              </option>
            ))
          ) : (
            <option value="">No user available</option>
          )}
        </select>
      </label>
      <button
        type="submit"
        className="bg-spotify-error py-3 px-8 rounded-full text-black font-bold self-center">
        Remove user
      </button>
    </form>
  );
};

const ListUsers = () => {
  const { users } = useUsers();

  return (
    <ul>
      {users.length > 0 ? (
        users.map((user) => <li key={user.username}>{user.username}</li>)
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
      <div className="p-4 max-w-lg">
        <h2 className="text-4xl font-bold mb-4">Add user</h2>
        <AddUserForm />
      </div>
      <div className="p-4 max-w-lg">
        <h2 className="text-4xl font-bold mb-4">Remove user</h2>
        <RemoveUserForm />
      </div>
      <div className="p-4 max-w-lg">
        <h2 className="text-4xl font-bold mb-4">List users</h2>
        <ListUsers />
      </div>
    </>
  );
};

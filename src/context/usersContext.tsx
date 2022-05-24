import { createContext, useContext, useEffect, useState } from "react";

type UserType = {
  username: string;
  password: string;
  // email: string;
};

type UsersContextType = {
  users: UserType[];
  addUser: (user: UserType) => void;
  removeUser: (targetUser: UserType) => void;
  removeUserByUsername: (username: string) => void;
};

const UsersContext = createContext<UsersContextType>(null!);

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const users = useProvideUsers();

  return (
    <UsersContext.Provider value={users}>{children}</UsersContext.Provider>
  );
};

export const useUsers = () => {
  return useContext(UsersContext);
};

const LS_KEYS = {
  USERS: "USERS",
};

const useProvideUsers = () => {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    // Load from localStorage
    const users = JSON.parse(
      window.localStorage.getItem(LS_KEYS.USERS) || "[]"
    );
    setUsers(users);
  }, []);

  const addUser = (user: UserType) => {
    setUsers((prevUsers) => [...prevUsers, user]);
    window.localStorage.setItem(
      LS_KEYS.USERS,
      JSON.stringify([...users, user])
    );
  };

  const removeUser = (targetUser: UserType) => {
    setUsers(users.filter((user) => user.username !== targetUser.username));
    window.localStorage.setItem(
      LS_KEYS.USERS,
      JSON.stringify(
        users.filter((user) => user.username !== targetUser.username)
      )
    );
  };

  const removeUserByUsername = (username: string) => {
    setUsers(users.filter((user) => user.username !== username));
    window.localStorage.setItem(
      LS_KEYS.USERS,
      JSON.stringify(users.filter((user) => user.username !== username))
    );
  };

  return { users, addUser, removeUser, removeUserByUsername };
};

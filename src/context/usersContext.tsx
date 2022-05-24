import { createContext, useContext } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

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
  const [users, setUsers] = useLocalStorage<UserType[]>(LS_KEYS.USERS, []);

  const addUser = (newUser: UserType) => {
    setUsers((users) => [...users, newUser]);
  };

  const removeUser = (targetUser: UserType) => {
    setUsers(users.filter((user) => user.username !== targetUser.username));
  };

  const removeUserByUsername = (username: string) => {
    setUsers(users.filter((user) => user.username !== username));
  };

  return { users, addUser, removeUser, removeUserByUsername };
};

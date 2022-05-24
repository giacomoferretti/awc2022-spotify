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
    // Check for necessary arguments
    if (!newUser.username) {
      throw new Error("username it's empty.");
    } else if (!newUser.password) {
      throw new Error("password it's empty.");
    }

    // Check if user already exists
    if (
      users.some((user) => {
        if (user.username === newUser.username) {
          return true;
        }

        return false;
      })
    ) {
      throw new Error(`${newUser.username} already exists.`);
    }

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

import { createContext, useContext } from "react";

import { useLocalStorage } from "@/hooks/useLocalStorage";

type UsersContextType = {
  users: User[];
  session: string | null;
  addUser: (user: User) => void;
  removeUser: (targetUser: User) => void;
  removeUserByUsername: (username: string) => void;
  usernameExists: (username: string) => boolean;
  emailExists: (email: string) => boolean;
  getUserByUsername: (username: string) => User;
  getUserByEmail: (email: string) => User;
  getCurrentUser: () => User | null;
  login: (loginUser: UserCredentials, callback: VoidFunction) => void;
  logout: (callback: VoidFunction) => void;
  signup: (newUser: User, callback: VoidFunction) => void;
  clearAll: () => void;
  updateDisplayName: (username: string, displayName: string) => void;
  addUserPlaylist: (username: string, playlistId: string) => void;
  addSavedPlaylist: (username: string, playlistId: string) => void;
};

const UsersContext = createContext<UsersContextType>({} as UsersContextType);

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
  SESSION: "SESSION",
};

const useProvideUsers = (): UsersContextType => {
  const [users, setUsers] = useLocalStorage<User[]>(LS_KEYS.USERS, []);
  const [session, setSession] = useLocalStorage<string | null>(
    LS_KEYS.SESSION,
    null
  );

  const usernameExists = (username: string) => {
    return users.some((user) => {
      if (user.username === username) {
        return true;
      }

      return false;
    });
  };

  const emailExists = (email: string) => {
    return users.some((user) => {
      if (user.email === email) {
        return true;
      }

      return false;
    });
  };

  const addUser = (newUser: User) => {
    // Check for necessary arguments
    if (!newUser.username) {
      throw new Error("username it's empty.");
    } else if (!newUser.password) {
      throw new Error("password it's empty.");
    }

    // Check if user already exists
    if (usernameExists(newUser.username)) {
      throw new Error(`${newUser.username} already exists.`);
    }

    // Check if email is already used
    if (emailExists(newUser.email)) {
      throw new Error(`${newUser.email} is already used.`);
    }

    setUsers((users) => [...users, newUser]);
  };

  const removeUser = (targetUser: User) => {
    setUsers(users.filter((user) => user.username !== targetUser.username));

    // Invalidate session
    if (targetUser.username === session) setSession(null);
  };

  const removeUserByUsername = (username: string) => {
    setUsers(users.filter((user) => user.username !== username));

    // Invalidate session
    if (username === session) setSession(null);
  };

  const getUserByUsername = (username: string) => {
    // Check if user exists
    if (!usernameExists(username)) {
      throw new Error(`${username} doesn't exist.`);
    }

    const userIndex = users.findIndex((user) => user.username === username);

    return users[userIndex];
  };

  const getUserByEmail = (email: string) => {
    // Check if user exists
    if (!emailExists(email)) {
      throw new Error(`${email} doesn't exist.`);
    }

    const userIndex = users.findIndex((user) => user.email === email);

    return users[userIndex];
  };

  const getCurrentUser = () => {
    return session ? getUserByUsername(session) : null;
  };

  const login = (loginUser: UserCredentials, callback: VoidFunction) => {
    const user = getUserByUsername(loginUser.username);

    // Check password
    if (loginUser.password !== user.password) {
      throw new Error(`Wrong password.`);
    }

    setSession(loginUser.username);

    callback();
  };

  const logout = (callback: VoidFunction) => {
    setSession(null);

    callback();
  };

  const signup = (newUser: User, callback: VoidFunction) => {
    addUser(newUser);

    setSession(newUser.username);

    callback();
  };

  const clearAll = () => {
    setUsers([]);
    setSession(null);
  };

  const updateDisplayName = (username: string, displayName: string) => {
    const usersCopy = users.slice();
    const userIndex = usersCopy.findIndex((user) => user.username === username);
    usersCopy[userIndex].displayName = displayName;

    setUsers(usersCopy);
  };

  const addUserPlaylist = (username: string, playlistId: string) => {
    const usersCopy = users.slice();
    const userIndex = usersCopy.findIndex((user) => user.username === username);
    usersCopy[userIndex].personalPlaylists.push(playlistId);

    setUsers(usersCopy);
  };

  const addSavedPlaylist = (username: string, playlistId: string) => {
    const usersCopy = users.slice();
    const userIndex = usersCopy.findIndex((user) => user.username === username);
    usersCopy[userIndex].savedPlaylists.push(playlistId);

    setUsers(usersCopy);
  };

  return {
    users,
    session,
    addUser,
    removeUser,
    removeUserByUsername,
    usernameExists,
    emailExists,
    getUserByUsername,
    getUserByEmail,
    getCurrentUser,
    login,
    logout,
    signup,
    clearAll,
    updateDisplayName,
    addUserPlaylist,
    addSavedPlaylist,
  };
};

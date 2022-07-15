import { createContext, useContext } from "react";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { User, UserCredentials } from "@/types";

type UsersContextType = {
  users: Record<string, User>;
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
  removeUserPlaylist: (username: string, playlistId: string) => void;
  addSavedPlaylist: (username: string, playlistId: string) => void;
  addFavoriteArtist: (username: string, artistId: string) => void;
  addFavoriteGenre: (username: string, genre: string) => void;
  removeFavoriteArtist: (username: string, artistId: string) => void;
  removeFavoriteGenre: (username: string, genre: string) => void;
  updateProfilePicture: (username: string, pictureData: string) => void;
  updateOnboarding: (username: string, onboarding: boolean) => void;
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
  const [users, setUsers] = useLocalStorage<Record<string, User>>(
    LS_KEYS.USERS,
    {}
  );
  const [session, setSession] = useLocalStorage<string | null>(
    LS_KEYS.SESSION,
    null
  );

  // useEffect(() => {
  //   setUsers((users) => {
  //     const copy = { ...users };
  //     console.log(copy);
  //     copy[getRandomUid()] = {
  //       username: getRandomUid(),
  //       password: getRandomUid(),
  //       email: getRandomUid(),
  //       displayName: getRandomUid(),
  //       personalPlaylists: [getRandomUid()],
  //       savedPlaylists: [getRandomUid()],
  //       favoriteGenres: [getRandomUid()],
  //       favoriteArtists: [getRandomUid()],
  //     };

  //     return copy;
  //   });
  // }, []);

  const usernameExists = (username: string) => {
    return Object.prototype.hasOwnProperty.call(users, username);
  };

  const emailExists = (email: string) => {
    return Object.keys(users).some((key) => {
      if (users[key].email === email) {
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

    setUsers((users) => {
      const copy = { ...users };
      copy[newUser.username] = newUser;
      return copy;
    });
  };

  const removeUser = (targetUser: User) => {
    removeUserByUsername(targetUser.username);
  };

  const removeUserByUsername = (username: string) => {
    setUsers((users) => {
      const copy = { ...users };
      delete copy[username];
      return copy;
    });

    // Invalidate session
    if (username === session) setSession(null);
  };

  const getUserByUsername = (username: string) => {
    // Check if user exists
    if (!usernameExists(username)) {
      throw new Error(`${username} doesn't exist.`);
    }

    return users[username];
  };

  const getUserByEmail = (email: string) => {
    // Check if user exists
    if (!emailExists(email)) {
      throw new Error(`${email} doesn't exist.`);
    }

    const userKey =
      Object.keys(users)[
        Object.keys(users).findIndex((key) => users[key].email === email)
      ];

    return users[userKey];
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
    setUsers({});
    setSession(null);
  };

  const updateDisplayName = (username: string, displayName: string) => {
    setUsers((users) => {
      const copy = { ...users };
      copy[username].displayName = displayName;
      return copy;
    });
  };

  const updateProfilePicture = (username: string, pictureData: string) => {
    setUsers((users) => {
      const copy = { ...users };
      copy[username].pictureData = pictureData;
      return copy;
    });
  };

  const updateOnboarding = (username: string, onboarding: boolean) => {
    setUsers((users) => {
      const copy = { ...users };
      copy[username].onboarding = onboarding;
      return copy;
    });
  };

  const addUserPlaylist = (username: string, playlistId: string) => {
    setUsers((users) => {
      const copy = { ...users };
      copy[username].personalPlaylists.push(playlistId);
      return copy;
    });
  };

  const removeUserPlaylist = (username: string, playlistId: string) => {
    setUsers((users) => {
      const copy = { ...users };

      const index = copy[username].personalPlaylists.indexOf(playlistId);
      if (index !== -1) {
        copy[username].personalPlaylists.splice(index, 1);
      }

      return copy;
    });
  };

  const addSavedPlaylist = (username: string, playlistId: string) => {
    setUsers((users) => {
      const copy = { ...users };
      copy[username].savedPlaylists.push(playlistId);
      return copy;
    });
  };

  const addFavoriteArtist = (username: string, artistId: string) => {
    if (users[username].favoriteArtists.includes(artistId)) return;

    setUsers((users) => {
      const copy = { ...users };
      copy[username].favoriteArtists.push(artistId);
      return copy;
    });
  };

  const addFavoriteGenre = (username: string, genre: string) => {
    if (users[username].favoriteGenres.includes(genre)) return;

    setUsers((users) => {
      const copy = { ...users };
      copy[username].favoriteGenres.push(genre);
      return copy;
    });
  };

  const removeFavoriteArtist = (username: string, artistId: string) => {
    setUsers((users) => {
      const copy = { ...users };
      copy[username].favoriteArtists = copy[username].favoriteArtists.filter(
        (x) => x !== artistId
      );
      return copy;
    });
  };

  const removeFavoriteGenre = (username: string, genre: string) => {
    setUsers((users) => {
      const copy = { ...users };
      copy[username].favoriteGenres = copy[username].favoriteGenres.filter(
        (x) => x !== genre
      );
      return copy;
    });
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
    updateProfilePicture,
    updateOnboarding,
    addUserPlaylist,
    removeUserPlaylist,
    addSavedPlaylist,
    addFavoriteArtist,
    addFavoriteGenre,
    removeFavoriteArtist,
    removeFavoriteGenre,
  };
};

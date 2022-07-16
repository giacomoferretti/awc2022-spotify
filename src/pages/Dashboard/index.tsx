import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  ArrowRightIcon,
  BellIcon,
  EmojiSadIcon,
  MenuIcon,
  MusicNoteIcon,
  PlusIcon,
  UserIcon,
  XIcon,
} from "@heroicons/react/outline";
import classNames from "classnames";
import { Fragment, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import noCoverImage from "@/assets/nocover.png";
import { Header } from "@/components/Header";
import { Logo } from "@/components/Logo";
import { usePlaylists, useUsers } from "@/context";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
  { name: "Reports", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

const TailwindUi = () => {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                        alt="Workflow"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}>
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user.imageUrl}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95">
                          <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}>
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}>
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pt-4 pb-3">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <div className="px-4 py-6 sm:px-0">
              <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  );
};

const HelloSection = () => {
  const { getCurrentUser } = useUsers();

  const user = useMemo(() => getCurrentUser(), []);
  if (!user) return <></>;

  const welcomeMessage = useMemo(() => {
    const hours = new Date().getHours();

    if (hours >= 5 && hours < 12) {
      return "Buongiorno";
    } else if (hours >= 12 && hours <= 18) {
      return "Buon pomeriggio";
    } else {
      return "Buonasera";
    }
  }, []);

  return (
    <section>
      <h1 className="my-4 text-3xl font-bold">
        {welcomeMessage}, {user.displayName}!
      </h1>
    </section>
  );
};

const NoPlaylists = ({
  message,
  actionMessage,
  action,
}: {
  message: string;
  actionMessage: string;
  action: string;
}) => {
  return (
    <div className="flex items-center justify-center rounded border-2 border-dashed border-neutral-500 py-8 text-neutral-500">
      <EmojiSadIcon className="mr-4 h-8 w-8" />
      <div>
        <h2>{message}</h2>
        <Link to={action} className="cursor-pointer font-bold hover:underline">
          {actionMessage}
        </Link>
      </div>
    </div>
  );
};

const PersonalPlaylists = () => {
  const { getCurrentUser } = useUsers();

  const user = useMemo(() => getCurrentUser(), []);
  if (!user) return <></>;

  return (
    <section>
      <h2 className="mb-2 text-xl font-bold">Le tue playlist personali</h2>

      {user.personalPlaylists.length !== 0 ? (
        <PlaylistFeed />
      ) : (
        <NoPlaylists
          message="Non hai nessuna playlist."
          actionMessage="Creane una!"
          action="/playlist/new"
        />
      )}
    </section>
  );
};

const SavedPlaylists = () => {
  const { getCurrentUser } = useUsers();

  const user = useMemo(() => getCurrentUser(), []);
  if (!user) return <></>;

  return (
    <section className="mt-4">
      <h2 className="mb-2 text-xl font-bold">Le tue playlist salvate</h2>

      {user.savedPlaylists.length !== 0 ? (
        <PlaylistFeed />
      ) : (
        <NoPlaylists
          message="Non hai salvato nessuna playlist."
          actionMessage="Cercane una!"
          action="/search"
        />
      )}
    </section>
  );
};

const PlaylistFeed = () => {
  const { getCurrentUser } = useUsers();
  const user = useMemo(() => getCurrentUser(), []);
  if (!user) return <></>;

  const { getPlaylistById } = usePlaylists();
  // const userPlaylists = useMemo(() => getUserPlaylists(user.username), []);

  // useEffect(() => {
  //   console.log(user);
  //   console.log(userPlaylists);
  // }, []);

  return (
    <div className="flex flex-wrap gap-4">
      {user.personalPlaylists.map((playlistId) => {
        const playlist = getPlaylistById(playlistId);

        return (
          <Link key={playlist.id} to={`/playlist/${playlist.id}`}>
            <div className="w-40 rounded bg-neutral-800 p-4 hover:bg-neutral-700">
              <div className="relative mb-4">
                <div className="w-full rounded bg-[#ffffff1a] pb-[100%]">
                  <img className="absolute h-full rounded" src={noCoverImage} />
                </div>
              </div>
              <div className="min-h-[1em]">
                <div className="lin overflow-hidden overflow-ellipsis whitespace-nowrap font-bold">
                  {playlist.name}
                </div>
                <div className="text-sm line-clamp-2">
                  {playlist.description}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
      <Link to="/playlist/new">
        <div className="flex h-full w-40 flex-col items-center justify-center rounded border-2 border-dashed border-neutral-500 p-4 text-neutral-500 hover:border-neutral-400 hover:text-neutral-400">
          <PlusIcon className="h-24 w-24 fill-current p-4" />
          <span className="text-center">Crea nuova playlist</span>
        </div>
      </Link>
    </div>
  );
};

export const Dashboard = () => {
  // const { generatePlaylist } = usePlaylists();

  // useEffect(() => {
  //   try {
  //     generatePlaylist();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

  return (
    <>
      <Helmet>
        <title>Dashboard - {import.meta.env.VITE_SITE_TITLE}</title>
      </Helmet>

      <HelloSection />
      <PersonalPlaylists />
      <SavedPlaylists />
    </>
  );
};

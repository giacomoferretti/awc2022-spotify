import { Menu, Transition } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import { Fragment, useMemo } from "react";
import { Link } from "react-router-dom";

import { Logo } from "@/components/Logo";
import { useUsers } from "@/context";

export const Header = () => {
  const { getCurrentUser } = useUsers();

  const user = useMemo(() => getCurrentUser(), [getCurrentUser]);

  return (
    <nav>
      <div className="flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Link to={"/dashboard"}>
              <span className="flex items-center justify-center gap-2 text-2xl font-bold">
                <Logo />
                <span>{import.meta.env.VITE_SITE_TITLE}</span>
              </span>
            </Link>
          </div>
        </div>

        {/* User menu */}
        <div className="ml-4 flex items-center md:ml-6">
          {/* <button
                type="button"
                className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button> */}

          {/* Profile dropdown */}
          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button
                //focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-900
                className="flex max-w-[10rem] items-center rounded-full text-sm">
                <span className="sr-only">Open user menu</span>
                {/* <img
                      className="h-8 w-8 rounded-full"
                      src={user.imageUrl}
                      alt=""
                    /> */}
                <UserIcon
                  className="h-8 w-8 shrink-0 rounded-full bg-[#282828] p-1"
                  aria-hidden="true"
                />
                <span className="ml-3 overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {user?.displayName}
                </span>
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
              <Menu.Items className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-[#282828] py-1 px-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to={`/user/${user?.username}`}
                      className={classNames(
                        { "bg-[#ffffff1a]": active },
                        "block rounded px-4 py-2 text-sm"
                      )}>
                      Il tuo profilo
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/settings/user"
                      className={classNames(
                        { "bg-[#ffffff1a]": active },
                        "block rounded px-4 py-2 text-sm"
                      )}>
                      Impostazioni
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/logout"
                      className={classNames(
                        { "bg-[#ffffff1a]": active },
                        "block rounded px-4 py-2 text-sm"
                      )}>
                      Logout
                    </Link>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

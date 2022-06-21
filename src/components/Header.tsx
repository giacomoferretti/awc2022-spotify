import { Menu, Transition } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import { Fragment, useMemo } from "react";
import { Link } from "react-router-dom";

import { Logo } from "@/components/Logo";
import { useUsers } from "@/context";

export const Header = () => {
  const { getCurrentUser } = useUsers();

  const user = useMemo(() => getCurrentUser(), []);

  return (
    <nav>
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Link to={"/dashboard"}>
              <h1 className="flex items-center justify-center gap-2 text-2xl font-bold">
                <Logo />
                <span>{import.meta.env.VITE_SITE_TITLE}</span>
              </h1>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {/* {navigation.map((item) => (
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
                ))} */}
            </div>
          </div>
        </div>
        <div className="hidden md:block">
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
                <Menu.Button className="flex max-w-[10rem] items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-900">
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
                  <span className="ml-3 overflow-hidden overflow-ellipsis">
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
      </div>
    </nav>
  );
};

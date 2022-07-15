import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate } from "react-router-dom";

import { useUsers } from "@/context";
import { Button } from "@/design/Button";

export const UserSettingsRedirect = () => {
  return <Navigate to="/settings/user" replace />;
};

const UserDeleteModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { removeUserByUsername, session } = useUsers();

  const onPositive = () => {
    setIsOpen(false);
    removeUserByUsername(session!);
  };

  const onNegative = () => {
    setIsOpen(false);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-neutral-800 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6">
                  Sei sicuro? Questa azione è irreversibile.
                </Dialog.Title>

                <div>
                  <Button variant="secondary" onClick={onNegative}>
                    Annulla
                  </Button>
                  <Button
                    variant="primary"
                    onClick={onPositive}
                    className="bg-spotify-error hover:bg-spotify-error">
                    Elimina
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export const UserSettings = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Impostazioni - {import.meta.env.VITE_SITE_TITLE}</title>
      </Helmet>

      <div>
        <h2>Modifica account</h2>
      </div>

      <div>
        <h2>Elimina account</h2>
        <Button
          variant="primary"
          onClick={openDialog}
          className="bg-spotify-error hover:bg-spotify-error">
          Elimina definitivamente
        </Button>
      </div>

      <UserDeleteModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import ButtonOutline from "@/components/Button/ButtonOutline";
import ButtonSolid from "@/components/Button/ButtonSolid";
import { useUsers } from "@/context";

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

                <div className="mt-4 flex justify-between">
                  <ButtonOutline variant="primary" onClick={onNegative}>
                    Annulla
                  </ButtonOutline>
                  <ButtonSolid variant="danger" onClick={onPositive}>
                    Elimina
                  </ButtonSolid>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export const DeleteUserSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  return (
    <>
      <h2 className="text-xl font-bold">Elimina account</h2>
      <p className="mb-4">
        Una volta cancellato l&apos;account, non è più possibile tornare
        indietro.
      </p>
      <ButtonSolid type="submit" variant="danger" onClick={openDialog}>
        Elimina definitivamente
      </ButtonSolid>

      <UserDeleteModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

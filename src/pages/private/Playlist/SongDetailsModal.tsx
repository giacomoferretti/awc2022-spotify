import { Dialog, Transition } from "@headlessui/react";
import { InformationCircleIcon } from "@heroicons/react/outline";
import cx from "classnames";
import { Fragment, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import ButtonSolid from "@/components/Button/ButtonSolid";
import BaseInput from "@/components/Input/BaseInput";
import { UsernameInput } from "@/components/Input/UsernameInput";
import { ValidationError } from "@/components/ValidationError";
import { useTracks, useUsers } from "@/context";
import { User } from "@/types";

export const SongDetailsModal = ({
  trackId,
  isOpen,
  setIsOpen,
}: {
  trackId: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { getTrackById } = useTracks();

  const track = useMemo(() => getTrackById(trackId), [getTrackById, trackId]);

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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-neutral-900 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6">
                  Dettagli canzone
                </Dialog.Title>

                {/* <div className="mt-2">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-4 flex flex-col items-center gap-6">
                    <div className="w-full">
                      <label
                        htmlFor="displayName"
                        className="mb-2 block text-sm font-medium">
                        Il tuo nome visualizzato
                      </label>
                      <BaseInput
                        id="displayName"
                        placeholder="Il tuo nome visualizzato"
                        defaultValue={user.displayName}
                        aria-invalid={errors.displayName ? "true" : "false"}
                        hasErrors={errors.displayName ? true : false}
                        className="w-full"
                        {...register("displayName", {
                          required: "Inserisci un nome visualizzato",
                        })}
                      />
                      {errors.displayName && (
                        <ValidationError message={errors.displayName.message} />
                      )}
                    </div>

                    <ButtonSolid variant="primary" shape="rounded">
                      Salva
                    </ButtonSolid> */}

                {/*}
                    <div>
                      <label>
                        <span className="mb-2 block text-sm font-medium">
                          Titolo della playlist
                        </span>
                        <input
                          id="name"
                          type="text"
                          placeholder="Inserisci il titolo della playlist."
                          defaultValue={playlist.name}
                          className="w-full rounded border-0 bg-[#ffffff1a] p-2.5 text-sm text-[#ffffffb3] placeholder:text-[#ffffffb3] focus:border-spotify-accent-base focus:ring-2 focus:ring-inset focus:ring-spotify-accent-base"
                          {...register("name", {
                            required: "Inserisci un titolo",
                          })}
                        />
                      </label>
                      {errors.name && (
                        <ValidationError message={errors.name.message} />
                      )}
                    </div>

                    <div>
                      <label>
                        <span className="mb-2 block text-sm font-medium">
                          Descrizione della playlist
                        </span>
                        <textarea
                          id="name"
                          placeholder="Inserisci la descrizione della playlist."
                          rows={4}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              return false;
                            }
                          }}
                          className="w-full resize-none rounded border-0 bg-[#ffffff1a] p-2.5 text-sm text-[#ffffffb3] placeholder:text-[#ffffffb3] focus:border-spotify-accent-base focus:ring-2 focus:ring-inset focus:ring-spotify-accent-base"
                          {...register("description")}
                        />
                        <span className="mt-2 flex space-x-1 text-sm text-neutral-400">
                          <InformationCircleIcon className="h-5 w-5 flex-shrink-0" />
                          <span>
                            Nella descrizione non si può andare a capo.
                          </span>
                        </span>
                      </label>
                    </div>

                    <button
                      className="flex items-center self-center rounded-full bg-spotify-accent-base py-3 px-8 font-bold text-black hover:bg-spotify-accent-highlight"
                      type="submit">
                      Salva
                    </button> */}
                {/* </form>
                </div> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

import { Dialog, Transition } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/outline";
import { Fragment, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";

import { Header } from "@/components/Header";
import { usePlaylists, useUsers } from "@/context";
import { NoMatch } from "@/pages";
import { User } from "@/types";

type UserProfileParams = Pick<User, "username">;

export const UserRedirect = () => {
  const { session } = useUsers();

  return <Navigate to={`/user/${session}`} replace />;
};

// function MyModal() {
//   return (
//     <>
//       <div className="fixed inset-0 flex items-center justify-center">
//         <button
//           type="button"
//           onClick={openModal}
//           className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
//           Open dialog
//         </button>
//       </div>
//     </>
//   );
// }

const UserHeader = ({ user }: { user: User }) => {
  const { getPlaylistById } = usePlaylists();

  const publicPlaylistsCount = useMemo(
    () =>
      user.personalPlaylists.reduce((sum, track) => {
        return sum + (getPlaylistById(track).isPublic ? 1 : 0);
      }, 0),
    []
  );

  return (
    <div className="flex gap-4">
      <div className="h-32 w-32 flex-shrink-0 rounded-full bg-neutral-800 p-8">
        {/* TODO: add user profile picture */}
        <UserIcon className="stroke-neutral-400" />
      </div>
      <div className="flex flex-1 flex-col justify-end">
        {/* <button type="button" onClick={openModal} title="Modifica dettagli"> */}
        <h2 className="text-left text-5xl font-bold">{user.displayName}</h2>
        {/* </button> */}
        <div className="mt-2 flex flex-wrap text-sm">
          <span className="whitespace-nowrap">
            {publicPlaylistsCount} Playlist Pubbliche
          </span>
          <span
            data-before="•"
            className="whitespace-nowrap before:mx-1 before:content-[attr(data-before)]">
            {user.personalPlaylists.length - publicPlaylistsCount} Playlist
            Private
          </span>
        </div>
      </div>
    </div>
  );
};

export const UserProfile = () => {
  const params = useParams<UserProfileParams>();

  const { session, getUserByUsername } = useUsers();

  const user = useMemo(() => {
    try {
      return getUserByUsername(params.username!);
    } catch {
      return null;
    }
  }, [session]);

  // If not found, show NoMatch
  if (!user) return <NoMatch />;

  return (
    <>
      <Helmet>
        <title>
          {user.username} - {import.meta.env.VITE_SITE_TITLE}
        </title>
      </Helmet>
      <Header />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <UserHeader user={user} />
      </div>

      <div>Le tue playlist pubbliche</div>
      <div>Le tue playlist private (VISIBILE SOLO A TE)</div>
      <div>Le tue playlist salvate</div>
    </>
  );
};

// type UserFormInputs = {
//   displayName: string;
// };

// export const UserProfile = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   function closeModal() {
//     setIsOpen(false);
//   }

//   function openModal() {
//     setIsOpen(true);
//   }

//   const params = useParams<UserProfileParams>();

//   const { session, getUserByUsername, updateDisplayName } = useUsers();

//   const user = useMemo(() => {
//     try {
//       return getUserByUsername(params.username!);
//     } catch {
//       return null;
//     }
//   }, [session]);

//   const { register, handleSubmit } = useForm<UserFormInputs>();

//   const onSubmit: SubmitHandler<UserFormInputs> = async (data) => {
//     updateDisplayName(session!, data.displayName);
//     setIsOpen(false);
//   };

//   // If not found, show NoMatch
//   if (!user) return <NoMatch />;

//   return (
//     <>
//       <Helmet>
//         <title>
//           {user.username} - {import.meta.env.VITE_SITE_TITLE}
//         </title>
//       </Helmet>
//       <Header />

//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"></div>

//       <Transition appear show={isOpen} as={Fragment}>
//         <Dialog as="div" className="relative z-10" onClose={closeModal}>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0">
//             <div className="fixed inset-0 bg-black bg-opacity-25" />
//           </Transition.Child>

//           <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex min-h-full items-center justify-center p-4 text-center">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95">
//                 <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded bg-neutral-800 p-6 text-left align-middle shadow-xl transition-all">
//                   <Dialog.Title
//                     as="h3"
//                     className="text-lg font-medium leading-6">
//                     Modifica nome visualizzato
//                   </Dialog.Title>
//                   <div className="mt-2">
//                     <form
//                       onSubmit={handleSubmit(onSubmit)}
//                       className="mt-4 flex">
//                       <input
//                         id="displayName"
//                         type="text"
//                         placeholder="Il tuo nome visualizzato"
//                         defaultValue={user.displayName}
//                         className="w-auto min-w-0 rounded-l border-0 bg-[#ffffff1a] p-2.5 text-sm text-[#ffffffb3] placeholder:text-[#ffffffb3] focus:border-spotify-accent-base focus:ring-2 focus:ring-inset focus:ring-spotify-accent-base"
//                         {...register("displayName", {
//                           required: "Inserisci un nome visualizzato",
//                         })}
//                       />
//                       <button
//                         className="flex self-center rounded-r bg-spotify-accent-base py-3 px-8 font-bold text-black focus:bg-spotify-accent-highlight"
//                         type="submit">
//                         Salva
//                       </button>
//                     </form>
//                   </div>

//                   {/* <div className="mt-4">
//                     <button
//                       type="button"
//                       className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                       onClick={closeModal}>
//                       Got it, thanks!
//                     </button>
//                   </div> */}
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>
//     </>
//   );
// };

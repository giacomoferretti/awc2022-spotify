import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { Logo } from "@/components/Logo";
import { useUsers } from "@/context/usersContext";

const Header = () => {
  return (
    <header className="flex flex-row-reverse gap-4 p-4">
      <Link
        className="flex items-center self-center rounded-full bg-spotify-accent-base py-3 px-8 font-bold text-black hover:bg-spotify-accent-highlight" // bg-spotify-accent-base hover:bg-spotify-accent-highlight py-3 px-8 rounded-full text-black font-bold self-center
        to="/signup">
        Signup
      </Link>
      <Link
        className="flex items-center self-center rounded-full font-bold"
        to="/login">
        Login
      </Link>
    </header>
  );
};

type HomeFormInputs = {
  email: string;
};

const Main = () => {
  const { emailExists, getUserByEmail } = useUsers();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    // formState: { errors, isSubmitting },
  } = useForm<HomeFormInputs>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<HomeFormInputs> = async (data) => {
    if (!emailExists(data.email)) {
      navigate("/signup", { state: { email: data.email } });
    } else {
      navigate("/login", {
        state: { username: getUserByEmail(data.email).username },
      });
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8">
      <h1 className="flex items-center gap-2  text-4xl font-bold">
        <Logo className="h-10 w-10" /> {import.meta.env.VITE_SITE_TITLE}
      </h1>
      <h2 className="mt-4 text-2xl font-bold">
        {import.meta.env.VITE_SITE_LONG_TITLE}
      </h2>
      <h3>
        Condividi le tue playlist con altri intenditori. Entra a far parte della
        community!
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex">
        {/* <p className="min-w-0 flex-1">
          A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A
          A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A
          A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A
          A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A
          A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A
        </p>
        <input className="min-w-0 flex-1" type="text" /> */}
        <input
          id="email"
          type="email"
          placeholder="La tua email"
          className="w-auto min-w-0 rounded-l border-0 bg-[#ffffff1a] p-2.5 text-sm text-[#ffffffb3] placeholder:text-[#ffffffb3] focus:border-spotify-accent-base focus:ring-2 focus:ring-inset focus:ring-spotify-accent-base"
          {...register("email", {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email non valida",
            },
            required: "Inserisci una email",
          })}
        />
        <button
          className="flex self-center rounded-r bg-spotify-accent-base py-3 px-8 font-bold text-black focus:bg-spotify-accent-highlight"
          type="submit">
          Inizia
        </button>
      </form>
      <Link className="hover:underline" to="/login">
        Hai già un account?
      </Link>
    </div>
  );
};

const Footer = () => {
  return (
    // <footer className="flex mb-4 text-sm text-center text-neutral-600">
    //   <select className="bg-[#2f2f2f] border-0 rounded focus:ring-inset focus:ring-2 focus:ring-spotify-accent-base focus:border-spotify-accent-base text-[#ffffffb3]">
    //     <option>Italiano</option>
    //     <option>English</option>
    //   </select>
    //   &copy; 2022 CMO
    // </footer>
    // <div className="flex justify-center">
    //   <img src="/hero.jpg" className="mx-12 h-48 rounded-t-2xl text-center" />
    // </div>
    // <div className="flex">
    //   <input
    //     id="email"
    //     type="email"
    //     placeholder="La tua email"
    //     className="min-w-0 rounded-l border-0 bg-[#ffffff1a] p-2.5 text-sm text-[#ffffffb3] placeholder:text-[#ffffffb3] focus:border-spotify-accent-base focus:ring-2 focus:ring-inset focus:ring-spotify-accent-base"
    //     // {...register("email", {
    //     //   pattern: {
    //     //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    //     //     message: "Email non valida",
    //     //   },
    //     //   required: "Inserisci una email",
    //     // })}
    //   />
    // </div>
    // <div className="flex flex-1 items-end ">
    //   <img src="/hero.jpg" />
    // </div>
    <></>
  );
};

export const Home = () => {
  const { session } = useUsers();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("/dashboard", { replace: true });
    }
  }, [session]);

  return session ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

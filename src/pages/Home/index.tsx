import { Link, useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { useEffect } from "react";
import { useUsers } from "@/context/usersContext";
import { SubmitHandler, useForm } from "react-hook-form";

const Header = () => {
  return (
    <header className="p-4 flex">
      <Link className="ml-auto" to="/login">
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
    formState: { errors, isSubmitting },
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
    <div className="flex-1 flex flex-col justify-center items-center gap-4">
      <h1 className="flex items-center gap-2 text-4xl font-bold">
        <Logo className="w-10 h-10" /> CMO
      </h1>
      <h2 className="mt-4 text-2xl font-bold">Comunità Musicali Online</h2>
      <h3>
        Condividi le tue playlist con altri intenditori. Entra a far parte della
        community!
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex">
        <input
          id="email"
          type="email"
          placeholder="La tua email"
          className="p-2.5 text-sm rounded-l border-0 bg-[#ffffff1a] text-[#ffffffb3] placeholder:text-[#ffffffb3] focus:ring-inset focus:ring-2 focus:ring-spotify-accent-base focus:border-spotify-accent-base"
          {...register("email", {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email non valida",
            },
            required: "Inserisci una email",
          })}
        />
        <button
          className="flex bg-spotify-accent-base focus:bg-spotify-accent-highlight py-3 px-8 rounded-r text-black font-bold self-center"
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
    <></>
  );
};

export const Home = () => {
  const { session } = useUsers();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("/dashboard");
    }
  }, [session]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

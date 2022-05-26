import { Logo } from "@/components/Logo";
import { useUsers } from "@/context/usersContext";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import { Link } from "react-router-dom";

type ButtonInputProps = {
  id: string;
  label: string;
  placeholder: string;
  className?: string;
  type?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const PasswordInput = ({
  id,
  label,
  placeholder,
  className,
  type = "text",
  ...props
}: ButtonInputProps) => {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-2 text-sm font-medium">
        {label}
      </label>
      <div className="flex border-0 rounded bg-[#ffffff1a] text-[#ffffffb3] focus-within:ring-inset focus-within:ring-2 focus-within:ring-spotify-accent-base focus-within:border-spotify-accent-base">
        <input
          id={id}
          type={passwordShown ? "text" : type}
          className="flex-1 text-sm p-2.5 pr-0 border-none focus:ring-0 focus:outline-none bg-transparent placeholder:text-[#ffffffb3]"
          placeholder={placeholder}
          {...props}
        />
        <button
          className="h-10 w-10 p-2.5"
          onClick={togglePassword}
          type="button">
          {passwordShown ? <EyeIcon /> : <EyeOffIcon />}
        </button>
      </div>
    </div>
  );
};

export const Login = () => {
  // const { checkUser } = useUsers();

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = (
      e.currentTarget.elements.namedItem("username") as HTMLInputElement
    ).value;
    const password = (
      e.currentTarget.elements.namedItem("password") as HTMLInputElement
    ).value;

    console.log(username, ":", password);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full flex flex-col gap-8">
            <h1 className="flex justify-center items-center gap-2 text-4xl font-bold">
              <Logo className="w-10 h-10" /> CMO
            </h1>

            <div className="p-4 rounded-lg bg-spotify-elevated-base sm:p-6 lg:p-8">
              <form className="flex flex-col gap-6" onSubmit={onSubmitHandler}>
                <h2 className="text-xl font-medium">Bentornato!</h2>

                <label>
                  <span className="block mb-2 text-sm font-medium">
                    Il tuo username o la tua email
                  </span>
                  <input
                    id="username"
                    type="text"
                    placeholder="Inserisci il tuo username o la tua email."
                    className="w-full p-2.5 text-sm rounded border-0 bg-[#ffffff1a] text-[#ffffffb3] placeholder:text-[#ffffffb3] focus:ring-inset focus:ring-2 focus:ring-spotify-accent-base focus:border-spotify-accent-base"
                  />
                </label>

                <PasswordInput
                  id="password"
                  label="La tua password"
                  placeholder="Inserisci la tua password."
                  type="password"
                />

                {/* <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-spotify-accent-base focus:ring-spotify-accent-base border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-spotify-accent-base hover:underline">
                      Forgot your password?
                    </a>
                  </div>
                </div> */}

                <div className="flex justify-center">
                  <button className="bg-spotify-accent-base hover:bg-spotify-accent-highlight py-3 px-8 rounded-full text-black font-bold self-center">
                    Entra
                  </button>
                </div>

                <div className="text-center text-sm font-medium text-[#ffffffb3]">
                  Non hai un account?{" "}
                  <Link
                    to="/signup"
                    className="text-spotify-accent-base hover:underline">
                    Creane uno
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

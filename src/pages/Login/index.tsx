import { Logo } from "@/components/Logo";
import { PasswordInput } from "@/components/PasswordInput";
import { Spinner } from "@/components/Spinner";
import { ValidationError } from "@/components/ValidationError";
import { useUsers } from "@/context/usersContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type LoginFormInputs = {
  username: string;
  password: string;
};

export const Login = () => {
  const { usernameExists } = useUsers();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 300);
    });
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
              <form
                className="flex flex-col gap-6"
                onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-xl font-medium">Bentornato!</h2>

                <div>
                  <label>
                    <span className="block mb-2 text-sm font-medium">
                      Il tuo username
                    </span>
                    <input
                      id="username"
                      type="text"
                      placeholder="Inserisci il tuo username."
                      aria-invalid={errors.username ? "true" : "false"}
                      className="w-full p-2.5 text-sm rounded border-0 bg-[#ffffff1a] text-[#ffffffb3] placeholder:text-[#ffffffb3] focus:ring-inset focus:ring-2 focus:ring-spotify-accent-base focus:border-spotify-accent-base"
                      {...register("username", {
                        pattern: {
                          value: /^[a-z0-9._]+$/i,
                          message:
                            "Sono consentiti solo lettere (a-z), numeri (0-9), punti (.) e i trattini bassi (_)",
                        },
                        required: "Inserisci un nome utente",
                        validate: {
                          checkUser: (v) =>
                            usernameExists(v) || "L'utente inserito non esiste",
                        },
                      })}
                    />
                  </label>
                  {errors.username && (
                    <ValidationError message={errors.username.message} />
                  )}
                </div>

                <div>
                  <PasswordInput
                    id="password"
                    label="La tua password"
                    placeholder="Inserisci la tua password."
                    type="password"
                    aria-invalid={errors.password ? "true" : "false"}
                    {...register("password", {
                      minLength: {
                        value: 8,
                        message:
                          "La tua password deve contenere almeno 8 caratteri.",
                      },
                      required: "Inserisci una password",
                    })}
                  />
                  {errors.password && (
                    <ValidationError message={errors.password.message} />
                  )}
                </div>

                <div className="flex justify-center">
                  <button
                    className="flex items-center bg-spotify-accent-base hover:bg-spotify-accent-highlight py-3 px-8 rounded-full text-black font-bold self-center"
                    disabled={isSubmitting}>
                    {isSubmitting && (
                      <Spinner className="animate-spin -ml-1 mr-3 h-5 w-5" />
                    )}{" "}
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

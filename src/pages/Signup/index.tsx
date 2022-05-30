import { Logo } from "@/components/Logo";
import { PasswordInput } from "@/components/PasswordInput";
import { Spinner } from "@/components/Spinner";
import { ValidationError } from "@/components/ValidationError";
import { useUsers } from "@/context/usersContext";
import { wait } from "@/utils/wait";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";

type SignupFormInputs = {
  username: string;
  password: string;
  email: string;
};

type CustomizedState = {
  email?: string;
};

// TODO: Wizard signup, split into different steps
export const Signup = () => {
  const { addUser, usernameExists } = useUsers();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormInputs>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    await wait(10000);
    addUser({
      username: data.username,
      email: data.email,
      password: data.password,
      favoriteArtists: [],
      favoriteGenres: [],
    });
  };

  // Get email from useNavigate, if available
  useEffect(() => {
    const state = location.state as CustomizedState;

    if (state && state.email) {
      setValue("email", state.email);
    }
  }, []);

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
                <h2 className="text-xl font-medium">Crea un account</h2>

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
                            !usernameExists(v) ||
                            "Il nome utente inserito è già stato preso",
                        },
                      })}
                    />
                  </label>
                  {errors.username && (
                    <ValidationError message={errors.username.message} />
                  )}
                </div>

                <div>
                  <label>
                    <span className="block mb-2 text-sm font-medium">
                      La tua email
                    </span>
                    <input
                      id="email"
                      type="email"
                      placeholder="Inserisci la tua email."
                      aria-invalid={errors.email ? "true" : "false"}
                      className="w-full p-2.5 text-sm rounded border-0 bg-[#ffffff1a] text-[#ffffffb3] placeholder:text-[#ffffffb3] focus:ring-inset focus:ring-2 focus:ring-spotify-accent-base focus:border-spotify-accent-base"
                      {...register("email", {
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Email non valida",
                        },
                        required: "Inserisci una email",
                      })}
                    />
                  </label>
                  {errors.email && (
                    <ValidationError message={errors.email.message} />
                  )}
                </div>

                <div>
                  <PasswordInput
                    label="La tua password"
                    id="password"
                    type="password"
                    placeholder="Inserisci la tua password."
                    aria-invalid={errors.password ? "true" : "false"}
                    {...register("password", {
                      minLength: {
                        value: 8,
                        message:
                          "Per la tua password utilizza almeno 8 caratteri.",
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
                    Crea il tuo account
                  </button>
                </div>

                <div className="text-center text-sm font-medium text-[#ffffffb3]">
                  Hai già un account?{" "}
                  <Link
                    to="/login"
                    className="text-spotify-accent-base hover:underline">
                    Accedi qui
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

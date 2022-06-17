import { useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Logo } from "@/components/Logo";
import { PasswordInput } from "@/components/PasswordInput";
import { Spinner } from "@/components/Spinner";
import { ValidationError } from "@/components/ValidationError";
import { useUsers } from "@/context/usersContext";
import { wait } from "@/utils/wait";

type LoginFormInputs = {
  username: string;
  password: string;
};

type CustomizedState = {
  username?: string;
};

export const Login = () => {
  const { login, usernameExists, session } = useUsers();

  const navigate = useNavigate();
  const location = useLocation();

  const navigatePathname = useMemo(() => {
    // const state = location.state as { from: Location };

    // if (state && state.from) {
    //   return state.from;
    // }

    const params = new URLSearchParams(location.search);

    const getLocation = (href: string) => {
      const a = document.createElement("a");
      a.href = href;
      return a;
    };

    const redirect = params.get("from") || "/dashboard";

    return getLocation(redirect).hostname === window.location.hostname
      ? redirect
      : "/dashboard";
  }, [location]);

  // Get username from useNavigate, if available
  useEffect(() => {
    const state = location.state as CustomizedState;

    if (state && state.username) {
      setValue("username", state.username);
    }

    if (session) {
      navigate("/dashboard", { replace: true });
    }
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    if (import.meta.env.DEV) await wait(500);

    login(data, () => {
      navigate(navigatePathname);
    });
  };

  return (
    <>
      <Helmet>
        <title>Entra - {import.meta.env.VITE_SITE_TITLE}</title>
      </Helmet>
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex w-full max-w-md flex-col gap-8">
            <h1 className="flex items-center justify-center gap-2 text-4xl font-bold">
              <Logo className="h-10 w-10" /> {import.meta.env.VITE_SITE_TITLE}
            </h1>

            <div className="rounded-lg bg-spotify-elevated-base p-4 sm:p-6 lg:p-8">
              <form
                className="flex flex-col gap-6"
                onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-xl font-medium">
                  {navigatePathname === "/dashboard"
                    ? "Bentornato!"
                    : "Accedi per visualizzare il contenuto!"}
                </h2>

                <div>
                  <label>
                    <span className="mb-2 block text-sm font-medium">
                      Il tuo username
                    </span>
                    <input
                      id="username"
                      type="text"
                      placeholder="Inserisci il tuo username."
                      aria-invalid={errors.username ? "true" : "false"}
                      className="w-full rounded border-0 bg-[#ffffff1a] p-2.5 text-sm text-[#ffffffb3] placeholder:text-[#ffffffb3] focus:border-spotify-accent-base focus:ring-2 focus:ring-inset focus:ring-spotify-accent-base"
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
                    className="flex items-center self-center rounded-full bg-spotify-accent-base py-3 px-8 font-bold text-black hover:bg-spotify-accent-highlight"
                    disabled={isSubmitting}>
                    {isSubmitting && (
                      <Spinner className="-ml-1 mr-3 h-5 w-5 animate-spin" />
                    )}
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

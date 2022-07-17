import { useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

import ButtonSolid from "@/components/Button/ButtonSolid";
import { PassInput } from "@/components/Input/PassInput";
import { UsernameInput } from "@/components/Input/UsernameInput";
import { Logo } from "@/components/Logo";
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

const Login = () => {
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
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    if (import.meta.env.DEV) await wait(500);

    try {
      login(data, () => {
        navigate(navigatePathname);
      });
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        setError("password", { type: "custom", message: "Password errata." });
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Accedi - {import.meta.env.VITE_SITE_TITLE}</title>
      </Helmet>

      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex w-full max-w-md flex-col gap-8">
            <h1 className="flex items-center justify-center gap-2 text-4xl font-bold">
              <Logo className="h-10 w-10" /> {import.meta.env.VITE_SITE_TITLE}
            </h1>

            {/* Main form */}
            <div className="rounded-lg border-2 border-neutral-700 p-8">
              <form
                className="flex flex-col gap-6"
                onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-xl font-medium">
                  {navigatePathname === "/dashboard"
                    ? "Bentornato!"
                    : "Accedi per visualizzare il contenuto."}
                </h2>

                {/* Username */}
                <div>
                  <label
                    htmlFor="username"
                    className="mb-2 block text-sm font-medium">
                    Il tuo username
                  </label>
                  <UsernameInput
                    id="username"
                    name="username"
                    className="w-full"
                    register={register}
                    errors={errors}
                    rules={{
                      validate: {
                        checkUser: (v) =>
                          usernameExists(v) || "L'utente inserito non esiste",
                      },
                    }}
                    required
                  />
                  {errors.username && (
                    <ValidationError message={errors.username.message} />
                  )}
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium">
                    La tua password
                  </label>
                  <PassInput
                    id="password"
                    name="password"
                    className="w-full"
                    register={register}
                    errors={errors}
                    required
                  />
                  {errors.password && (
                    <ValidationError message={errors.password.message} />
                  )}
                </div>

                {/* Submit button */}
                <div className="flex justify-center">
                  <ButtonSolid
                    variant="primary"
                    className="rounded-full px-8"
                    disabled={isSubmitting}>
                    {isSubmitting && (
                      <Spinner className="-ml-1 mr-3 h-5 w-5 animate-spin" />
                    )}
                    Entra
                  </ButtonSolid>
                </div>

                <div className="text-center text-sm font-medium text-neutral-300">
                  Non hai un account?{" "}
                  <Link to="/signup" className="text-green-500 hover:underline">
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

export default Login;

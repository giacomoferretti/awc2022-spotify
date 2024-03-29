import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

import ButtonSolid from "@/components/Button/ButtonSolid";
import { EmailInput } from "@/components/Input/EmailInput";
import { PassInput } from "@/components/Input/PassInput";
import { PasswordInput } from "@/components/Input/PasswordInput";
import { UsernameInput } from "@/components/Input/UsernameInput";
import { Logo } from "@/components/Logo";
import { Spinner } from "@/components/Spinner";
import { ValidationError } from "@/components/ValidationError";
import { useUsers } from "@/context/usersContext";
import { wait } from "@/utils/wait";

type SignupFormInputs = {
  username: string;
  password: string;
  email: string;
};

type CustomizedState = {
  email?: string;
};

const Signup = () => {
  const { session, signup, usernameExists } = useUsers();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    // watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormInputs>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    if (import.meta.env.DEV) await wait(500);

    signup(
      {
        username: data.username,
        email: data.email,
        password: data.password,
        displayName: data.username,
        pictureData: null,
        personalPlaylists: [],
        savedPlaylists: [],
        favoriteArtists: [],
        favoriteGenres: [],
        onboarding: true,
      },
      () => {
        navigate("/onboarding");
      }
    );
  };

  // Get email from useNavigate, if available
  useEffect(() => {
    const state = location.state as CustomizedState;

    if (state && state.email) {
      setValue("email", state.email);
    }

    if (session) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Crea un account - {import.meta.env.VITE_SITE_TITLE}</title>
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
                <h2 className="text-xl font-medium">Crea un account</h2>

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
                          !usernameExists(v) ||
                          "Il nome utente inserito è già stato preso",
                      },
                    }}
                    required
                  />
                  {errors.username && (
                    <ValidationError message={errors.username.message} />
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium">
                    La tua email
                  </label>
                  <EmailInput
                    id="email"
                    name="email"
                    placeholder="Inserisci la tua email."
                    className="w-full"
                    register={register}
                    errors={errors}
                    required
                  />
                  {errors.email && (
                    <ValidationError message={errors.email.message} />
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
                    Crea il tuo account
                  </ButtonSolid>
                </div>

                <div className="text-center text-sm font-medium text-neutral-300">
                  Hai già un account?{" "}
                  <Link to="/login" className="text-green-500 hover:underline">
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

export default Signup;

{
  /* <div>
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
                    <span className="mb-2 block text-sm font-medium">
                      La tua email
                    </span>
                    <input
                      id="email"
                      type="email"
                      placeholder="Inserisci la tua email."
                      aria-invalid={errors.email ? "true" : "false"}
                      className="w-full rounded border-0 bg-[#ffffff1a] p-2.5 text-sm text-[#ffffffb3] placeholder:text-[#ffffffb3] focus:border-spotify-accent-base focus:ring-2 focus:ring-inset focus:ring-spotify-accent-base"
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
                    className="flex items-center self-center rounded-full bg-spotify-accent-base py-3 px-8 font-bold text-black hover:bg-spotify-accent-highlight"
                    disabled={isSubmitting}>
                    {isSubmitting && (
                      <Spinner className="-ml-1 mr-3 h-5 w-5 animate-spin" />
                    )}
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
                </div> */
}

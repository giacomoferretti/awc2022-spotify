import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import ButtonSolid from "@/components/Button/ButtonSolid";
import { EmailInput } from "@/components/Input/EmailInput";
import { Logo } from "@/components/Logo";
import { ValidationError } from "@/components/ValidationError";
import { useUsers } from "@/context";

type HomeFormInputs = {
  email: string;
};

const HomeContent = () => {
  const { emailExists, getUserByEmail } = useUsers();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HomeFormInputs>();

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
      {/* Logo */}
      <h1 className="flex items-center gap-2 text-4xl font-bold">
        <Logo className="h-10 w-10" /> {import.meta.env.VITE_SITE_TITLE}
      </h1>
      <h2 className="mt-4 text-2xl font-bold">
        {import.meta.env.VITE_SITE_LONG_TITLE}
      </h2>

      {/* Headline */}
      <h3>
        Condividi le tue playlist con altri intenditori. Entra a far parte della
        community!
      </h3>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="flex">
          <EmailInput
            register={register}
            errors={errors}
            name="email"
            className="rounded-r-none"
            required
          />
          <ButtonSolid size="base" variant="primary" className="rounded-l-none">
            Inizia
          </ButtonSolid>
        </div>
        {errors.email && <ValidationError message={errors.email.message} />}
      </form>
      <Link className="hover:underline" to="/login">
        Hai già un account?
      </Link>
    </div>
  );
};

export default HomeContent;

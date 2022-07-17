import { useMemo } from "react";

import { useUsers } from "@/context";

export const WelcomeMessage = () => {
  const { getCurrentUser } = useUsers();

  const user = useMemo(() => getCurrentUser(), [getCurrentUser]);

  const welcomeMessage = useMemo(() => {
    const hours = new Date().getHours();

    if (hours >= 5 && hours < 12) {
      return "Buongiorno";
    } else if (hours >= 12 && hours <= 18) {
      return "Buon pomeriggio";
    } else {
      return "Buonasera";
    }
  }, []);

  if (!user) return null;

  return (
    <section>
      <h1 className="my-4 text-3xl font-bold">
        {welcomeMessage}, {user.displayName}!
      </h1>
    </section>
  );
};

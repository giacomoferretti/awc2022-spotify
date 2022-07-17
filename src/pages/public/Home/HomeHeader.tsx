import { Link } from "react-router-dom";

import ButtonSolid from "@/components/Button/ButtonSolid";

const HomeHeader = () => {
  return (
    <header className="flex flex-row-reverse gap-4 p-4">
      <ButtonSolid as={Link} variant="primary" to="/signup">
        Crea account
      </ButtonSolid>
      <ButtonSolid as={Link} variant="transparent" to="/login">
        Accedi
      </ButtonSolid>
    </header>
  );
};

export default HomeHeader;

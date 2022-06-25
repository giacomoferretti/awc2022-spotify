import { BrowserRouter } from "react-router-dom";

import { DebugAbsoluteNav } from "@/pages/Debug/Debug";
import routes from "@/routes";

export const App = () => {
  return (
    <BrowserRouter>
      {/* {import.meta.env.DEV && <DebugAbsoluteNav />} */}
      {routes}
    </BrowserRouter>
  );
};

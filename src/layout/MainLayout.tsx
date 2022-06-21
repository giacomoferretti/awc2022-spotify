import { Outlet } from "react-router-dom";

import { Header } from "@/components/Header";

export const MainLayout = () => {
  return (
    <>
      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Header />
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </>
  );
};

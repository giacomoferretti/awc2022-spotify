import React from "react";

export type Step = {
  title: string;
  subtitle: string;
  Component: React.FunctionComponent;
};

export const steps: Step[] = [
  {
    title: "I tuoi artisti preferiti",
    subtitle: "Seleziona i tuoi artisti preferiti.",
    Component: React.lazy(() => import("./ArtistsSelection")),
  },
  {
    title: "I tuoi generi preferiti",
    subtitle: "Seleziona i tuoi generi preferiti.",
    Component: React.lazy(() => import("./GenresSelection")),
  },
  {
    title: "Personalizza il tuo profilo",
    subtitle:
      "Ecco il tuo profilo! Puoi personalizzare il tuo nome e la tua foto.",
    Component: React.lazy(() => import("./UserPreview")),
  },
];

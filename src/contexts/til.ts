import type { Til } from "content-collections";

import { createContext, use } from "react";

type TilContext = Til;

const Context = createContext<TilContext | undefined>(undefined);
Context.displayName = "TilContext";

export const useTilContext = () => {
  const context = use(Context);

  if (!context) {
    throw new Error("useTilContext must be used within a TilProvider");
  }

  return context;
};

export const TilProvider = Context.Provider;

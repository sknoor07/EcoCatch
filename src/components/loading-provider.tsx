"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface LoadingContextType {
  framesReady: boolean;
  setFramesReady: (v: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
  framesReady: false,
  setFramesReady: () => {},
});

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [framesReady, setFramesReady] = useState(false);

  return (
    <LoadingContext.Provider value={{ framesReady, setFramesReady }}>
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext);

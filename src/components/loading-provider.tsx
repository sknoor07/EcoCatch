"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface LoadingContextType {
  framesReady: boolean;
  setFramesReady: (v: boolean) => void;
  sceneReady: boolean;
  setSceneReady: (v: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
  framesReady: false,
  setFramesReady: () => {},
  sceneReady: false,
  setSceneReady: () => {},
});

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [framesReady, setFramesReady] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  return (
    <LoadingContext.Provider value={{ framesReady, setFramesReady, sceneReady, setSceneReady }}>
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext);
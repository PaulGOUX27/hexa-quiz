import { createContext, useContext } from "react";

export type SoundContext = void;

export const SoundContext = createContext<SoundContext>(undefined!);

export const useSound = (): SoundContext => {
  return useContext(SoundContext);
};

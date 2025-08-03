import { useEffect } from "react";

export function useKeyboardListener(key: string, callback: () => void) {
  useEffect(() => {
    const wrappedCallback = (e: KeyboardEvent) => {
      if (e.key !== key) {
        return;
      }
      callback();
    };

    document.addEventListener("keydown", wrappedCallback);
    return () => document.removeEventListener("keydown", wrappedCallback);
  }, [callback, key]);
}

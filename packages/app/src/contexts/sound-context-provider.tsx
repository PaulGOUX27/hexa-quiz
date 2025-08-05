import { type PropsWithChildren, useEffect, useRef } from "react";
import { SoundContext } from "./sound-context.ts";
import { useWebSocket } from "./web-socket.ts";
import redSound from "/sounds/teams/red.mp3";
import blueSound from "/sounds/teams/blue.mp3";

export function SoundContextProvider({ children }: PropsWithChildren) {
  const { addListener } = useWebSocket();
  const redAudio = useRef(new Audio(redSound));
  const blueAudio = useRef(new Audio(blueSound));

  useEffect(() => {
    return addListener("buzResponse", async ({ team }) => {
      if (team === "red") {
        await redAudio.current.play();
      }
      if (team === "blue") {
        await blueAudio.current?.play();
      }
    });
  }, [addListener]);

  return (
    <SoundContext.Provider value={undefined}>{children}</SoundContext.Provider>
  );
}

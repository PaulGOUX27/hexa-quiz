import { type PropsWithChildren, useEffect, useRef } from "react";
import { SoundContext } from "./sound-context.ts";
import { useWebSocket } from "./web-socket.ts";
import redSound from "/sounds/teams/red.mp3";
import blueSound from "/sounds/teams/blue.mp3";
import path from "path-browserify";

export function SoundContextProvider({ children }: PropsWithChildren) {
  const { addListener } = useWebSocket();
  const redAudio = useRef(new Audio(redSound));
  const blueAudio = useRef(new Audio(blueSound));
  const songAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return addListener("buzResponse", async ({ team }) => {
      if (team === "red") {
        await redAudio.current.play();
        songAudio.current?.pause();
      } else if (team === "blue") {
        await blueAudio.current?.play();
        songAudio.current?.pause();
      } else if (team === null) {
        await songAudio.current?.play();
      }
    });
  }, [addListener]);

  // TODO add song:stop
  // TODO add score on mobile

  useEffect(() => {
    return addListener("song:play", async ({ title }) => {
      songAudio.current?.pause();
      songAudio.current = new Audio(path.join("/sounds", title));
      await songAudio.current.play();
    });
  }, [addListener]);

  useEffect(() => {
    return addListener("song:pause", async () => {
      songAudio.current?.pause();
    });
  }, [addListener]);

  useEffect(() => {
    return addListener("song:resume", async () => {
      await songAudio.current?.play();
    });
  }, [addListener]);

  return (
    <SoundContext.Provider value={undefined}>{children}</SoundContext.Provider>
  );
}

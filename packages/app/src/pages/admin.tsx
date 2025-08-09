import { useWebSocket } from "../contexts/web-socket.ts";
import { useCallback } from "react";
import "./admin.css";
import { AdminContextProvider } from "../contexts/admin-context-provider.tsx";

function Song({
  play,
  title,
}: {
  play: (title: string) => void;
  title: string;
}) {
  return (
    <li>
      {title}
      <button onClick={() => play(title)}>Play</button>
    </li>
  );
}

export function Admin() {
  const { send } = useWebSocket();
  const songs = JSON.parse(import.meta.env.VITE_SONG_LIST) as string[];

  const play = useCallback(
    (title: string) => {
      send({ type: "song:play", title });
    },
    [send],
  );

  const pause = useCallback(() => {
    send({ type: "song:pause" });
  }, [send]);

  const resume = useCallback(() => {
    send({ type: "song:resume" });
  }, [send]);

  return (
    <AdminContextProvider>
      <div className="song-list">
        <ol>
          {songs.map((song) => (
            <Song key={song} title={song} play={play} />
          ))}
        </ol>
      </div>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
    </AdminContextProvider>
  );
}

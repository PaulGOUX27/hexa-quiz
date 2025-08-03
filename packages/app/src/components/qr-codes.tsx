import { QRCodeSVG } from "qrcode.react";
import { TeamBackground } from "./team-background.tsx";

export function QrCodes() {
  return (
    <TeamBackground
      isBlueActive={true}
      blueChildren={
        <QRCodeSVG
          value={`http://${import.meta.env.VITE_LOCAL_IP}:5173/buzzer?team=blue`}
        />
      }
      isRedActive={true}
      redChildren={
        <QRCodeSVG
          value={`http://${import.meta.env.VITE_LOCAL_IP}:5173/buzzer?team=red`}
        />
      }
    />
  );
}

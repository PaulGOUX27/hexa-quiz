import { QRCodeSVG } from "qrcode.react";
import "../pages/home.css";

export function QrCodes() {
  return (
    <div className="score-panel-root">
      <div className={`score-panel score-panel-red`}>
        <QRCodeSVG
          value={`http://${import.meta.env.VITE_LOCAL_IP}:5173/buzzer?team=red`}
        />
      </div>

      <div className={`score-panel score-panel-blue`}>
        <QRCodeSVG
          value={`http://${import.meta.env.VITE_LOCAL_IP}:5173/buzzer?team=blue`}
        />
      </div>
    </div>
  );
}

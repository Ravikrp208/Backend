import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";

export default function FaceExpression({ onClick = () => {} }) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("Camera Ready");

  useEffect(() => {
    init({ landmarkerRef, videoRef, streamRef }).then(() => {
      setExpression("Ready to Scan");
    }).catch(err => {
      console.error("Failed to initialize camera:", err);
      setExpression("Camera Error");
    });

    return () => {
      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  async function handleClick() {
    const detectedExp = detect({ landmarkerRef, videoRef, setExpression });
    if (detectedExp) {
      onClick(detectedExp);
    }
  }

  return (
    <div className="scanner-card">
      <div className="webcam-container">
        <video
          ref={videoRef}
          playsInline
        />
        <div className="scanline"></div>
        <div className="corner-marker corner-marker--tl"></div>
        <div className="corner-marker corner-marker--tr"></div>
        <div className="corner-marker corner-marker--bl"></div>
        <div className="corner-marker corner-marker--br"></div>
      </div>

      <div className="detect-result">
        <div className="label">Detected Mood</div>
        <div className={`value detected-${expression ? expression.toLowerCase() : "neutral"}`}>
          {expression}
        </div>
      </div>

      <button className="scan-action-btn" onClick={handleClick}>
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
        Detect Expression
      </button>
    </div>
  );
}

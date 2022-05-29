import { ObsState } from "../reducer";
import pngtuberEyesOpenMouthClosed from "../../assets/pngtuber-eyes-open-mouth-closed.png";
import pngtuberEyesOpenMouthOpen from "../../assets/pngtuber-eyes-open-mouth-open.png";
import pngtuberEyesClosedMouthClosed from "../../assets/pngtuber-eyes-closed-mouth-closed.png";
import pngtuberEyesClosedMouthOpen from "../../assets/pngtuber-eyes-closed-mouth-open.png";
import { useEffect, useState } from "react";

type ConnectedProps = {
  state: ObsState;
};

const Connected = ({ state: { micVolume } }: ConnectedProps) => {
  const [micVolumeRingBuffer, setMicVolumeRingBuffer] = useState(
    Array.from({ length: 5 }).map(() => -Infinity)
  );

  useEffect(() => {
    setMicVolumeRingBuffer([...micVolumeRingBuffer.slice(1), micVolume]);
  }, [micVolume]);

  const eyesOpen = Math.sin(Date.now() / 1000) > -0.995;
  const mouthOpen = Math.max(...micVolumeRingBuffer) > -30;
  const imageSource = mouthOpen
    ? eyesOpen
      ? pngtuberEyesOpenMouthOpen
      : pngtuberEyesClosedMouthOpen
    : eyesOpen
    ? pngtuberEyesOpenMouthClosed
    : pngtuberEyesClosedMouthClosed;

  return (
    <div>
      <img
        className={`${mouthOpen ? "animate-talking" : "animate-breathing"}`}
        src={imageSource}
      />
    </div>
  );
};

export default Connected;

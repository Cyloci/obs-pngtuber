import { ObsState } from "../reducer";
import { useEffect, useState } from "react";

type ConnectedProps = {
  state: ObsState;
};

const Connected = ({
  state: { micVolume, pngtuberSources },
}: ConnectedProps) => {
  const [micVolumeRingBuffer, setMicVolumeRingBuffer] = useState(
    Array.from({ length: 5 }).map(() => -Infinity)
  );

  useEffect(() => {
    setMicVolumeRingBuffer([...micVolumeRingBuffer.slice(1), micVolume]);
  }, [micVolume]);

  const eyesOpen = Math.sin(Date.now() / 1000) > -0.995;
  const mouthOpen = Math.max(...micVolumeRingBuffer) > -30;
  const imageSource = eyesOpen
    ? mouthOpen
      ? pngtuberSources.eyesOpen.mouthOpen
      : pngtuberSources.eyesOpen.mouthClosed
    : mouthOpen
    ? pngtuberSources.eyesClosed.mouthOpen
    : pngtuberSources.eyesClosed.mouthClosed;

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

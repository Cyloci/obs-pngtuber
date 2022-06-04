import { useEffect, useRef } from "react";
import ObsWebSocket, { EventSubscription } from "obs-websocket-js";
import { useImmerReducer } from "use-immer";
import { State, reducer } from "./reducer";
import Setup from "./components/Setup";
import Connected from "./components/Connected";
import { mulToDb, mustFind } from "./utils";

type InputVolumeMeters = { inputName: string; inputLevelsMul: number[][] };

function App() {
  const obs = useRef(new ObsWebSocket());

  const [connectionState, dispatch] = useImmerReducer(reducer, {
    kind: "loggingIn",
  } as State);

  useEffect(() => {
    obs.current.on("InputVolumeMeters", ({ inputs }) => {
      // https://github.com/obsproject/obs-websocket/commit/d48ddef0318af1e370a4d0b77751afc14ac6b140
      const leftChannel = mustFind(
        inputs as InputVolumeMeters[],
        ({ inputName }) => inputName.toLowerCase() === "mic"
      ).inputLevelsMul[0];
      const inputPeak = leftChannel[2];
      const micVolume = mulToDb(inputPeak);
      dispatch({ kind: "setMicVolume", payload: { micVolume } });
    });
  }, []);

  useEffect(() => {
    const url = new URL(location.href);
    const address = url.searchParams.get("address");
    const password = url.searchParams.get("password");
    const pngtuberEyesClosedMouthClosedSrc = url.searchParams.get(
      "pngtuberEyesClosedMouthClosedSrc"
    );
    const pngtuberEyesClosedMouthOpenSrc = url.searchParams.get(
      "pngtuberEyesClosedMouthOpenSrc"
    );
    const pngtuberEyesOpenMouthClosedSrc = url.searchParams.get(
      "pngtuberEyesOpenMouthClosedSrc"
    );
    const pngtuberEyesOpenMouthOpenSrc = url.searchParams.get(
      "pngtuberEyesOpenMouthOpenSrc"
    );
    if (
      address === null ||
      password === null ||
      pngtuberEyesClosedMouthClosedSrc === null ||
      pngtuberEyesClosedMouthOpenSrc === null ||
      pngtuberEyesOpenMouthClosedSrc === null ||
      pngtuberEyesOpenMouthOpenSrc === null
    ) {
      return;
    }
    (async () => {
      try {
        await obs.current.connect(address, password, {
          eventSubscriptions:
            EventSubscription.All | EventSubscription.InputVolumeMeters,
          rpcVersion: 1,
        });
        console.info("connected to OBS");
      } catch (error: any) {
        console.error(error);
        dispatch({
          kind: "setConnectionState",
          payload: {
            state: {
              kind: "loggingIn",
              errorMessage: `Logging in failed: ${error.message}`,
            },
          },
        });
        return;
      }
      dispatch({
        kind: "setConnectionState",
        payload: {
          state: {
            kind: "connected",
            obsState: {
              micVolume: 0,
              pngtuberSources: {
                eyesOpen: {
                  mouthOpen: pngtuberEyesOpenMouthOpenSrc,
                  mouthClosed: pngtuberEyesOpenMouthClosedSrc,
                },
                eyesClosed: {
                  mouthOpen: pngtuberEyesClosedMouthOpenSrc,
                  mouthClosed: pngtuberEyesClosedMouthClosedSrc,
                },
              },
            },
          },
        },
      });
    })();
  }, []);

  return (
    <div className="p-5">
      {connectionState.kind === "connected" ? (
        <Connected state={connectionState.obsState} />
      ) : (
        <Setup />
      )}
    </div>
  );
}

export default App;

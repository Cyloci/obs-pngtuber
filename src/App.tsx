import { useEffect, useRef } from "react";
import ObsWebSocket from "obs-websocket-js";
import { useImmerReducer } from "use-immer";
import { State, reducer } from "./reducer";
import Login from "./components/Login";
import Connected from "./components/Connected";
import { mulToDb, mustFind } from "./utils";
import { leaveScope } from "immer/dist/internal";

type InputVolumeMeters = { inputName: string; inputLevelsMul: number[][] };

function App() {
  const obs = useRef(new ObsWebSocket());

  const [connectionState, dispatch] = useImmerReducer(reducer, {
    kind: "loggingIn",
  } as State);

  useEffect(() => {
    obs.current.on;
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

  return (
    <div className="p-5">
      {connectionState.kind === "connected" ? (
        <Connected state={connectionState.obsState} />
      ) : (
        <Login
          errorMessage={connectionState.errorMessage}
          obs={obs}
          dispatch={dispatch}
        />
      )}
    </div>
  );
}

export default App;

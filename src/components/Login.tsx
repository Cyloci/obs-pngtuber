import ObsWebSocket, { EventSubscription } from "obs-websocket-js";
import { Dispatch, MutableRefObject } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { Action } from "../reducer";

type LoginProps = {
  errorMessage?: string;
  obs: MutableRefObject<ObsWebSocket>;
  dispatch: Dispatch<Action>;
};

const Login = ({ errorMessage, obs, dispatch }: LoginProps) => {
  const [address, setAddress] = useLocalStorage(
    "address",
    "ws://localhost:4455"
  );
  const [password, setPassword] = useLocalStorage("password", "");

  const onClickConnect = async () => {
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
          },
        },
      },
    });
  };

  return (
    <div>
      {errorMessage && (
        <span className="block text-sm font-medium text-red-700">
          {errorMessage}
        </span>
      )}
      <label>
        <span className="block my-2 text-sm font-medium text-slate-700  mr-1">
          Address
        </span>
        <input
          className="peer p-1 border-2 rounded-lg mr-2"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>
      <label>
        <span className="block my-2 text-sm font-medium text-slate-700 mr-1">
          Password
        </span>
        <input
          type="password"
          className="peer p-1 border-2 rounded-lg mr-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button
        className="block my-4 px-4 py-1 rounded-lg text-white bg-blue-600 hover:bg-blue-700"
        onClick={onClickConnect}
      >
        Connect
      </button>
    </div>
  );
};
export default Login;

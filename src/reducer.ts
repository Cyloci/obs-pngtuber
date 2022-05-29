export type ObsState = {
  micVolume: number;
};

export type State =
  | {
      kind: "loggingIn";
      errorMessage?: string;
    }
  | {
      kind: "connected";
      obsState: ObsState;
    };

export type Action =
  | {
      kind: "setConnectionState";
      payload: {
        state: State;
      };
    }
  | {
      kind: "setMicVolume";
      payload: {
        micVolume: number;
      };
    };

export const reducer = (draft: State, action: Action): State => {
  if (action.kind === "setConnectionState") {
    return action.payload.state;
  }
  if (draft.kind !== "connected") {
    return draft;
  }
  const state = draft.obsState;
  switch (action.kind) {
    case "setMicVolume":
      state.micVolume = action.payload.micVolume;
  }
  return draft;
};

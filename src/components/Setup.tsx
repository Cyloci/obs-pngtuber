import useLocalStorage from "../hooks/useLocalStorage";

const Login = () => {
  const [
    pngtuberEyesClosedMouthClosedSrc,
    setPngtuberEyesClosedMouthClosedSrc,
  ] = useLocalStorage(
    "pngtuberEyesClosedMouthClosedSrc",
    "https://cdn.discordapp.com/attachments/982471426542018620/982471597187301376/pngtuber-eyes-closed-mouth-closed.png"
  );

  const [pngtuberEyesClosedMouthOpenSrc, setPngtuberEyesClosedMouthOpenSrc] =
    useLocalStorage(
      "pngtuberEyesClosedMouthOpenSrc",
      "https://cdn.discordapp.com/attachments/982471426542018620/982471597455724564/pngtuber-eyes-closed-mouth-open.png"
    );

  const [pngtuberEyesOpenMouthClosedSrc, setPngtuberEyesOpenMouthClosedSrc] =
    useLocalStorage(
      "pngtuberEyesOpenMouthClosedSrc",
      "https://cdn.discordapp.com/attachments/982471426542018620/982471597728350228/pngtuber-eyes-open-mouth-closed.png"
    );

  const [pngtuberEyesOpenMouthOpenSrc, setPngtuberEyesOpenMouthOpenSrc] =
    useLocalStorage(
      "pngtuberEyesOpenMouthOpenSrc",
      "https://cdn.discordapp.com/attachments/982471426542018620/982471598000988170/pngtuber-eyes-open-mouth-open.png"
    );
  const [address, setAddress] = useLocalStorage(
    "address",
    "ws://localhost:4455"
  );
  const [password, setPassword] = useLocalStorage("password", "");

  const sourceUrl = new URL(location.href);
  sourceUrl.searchParams.append(
    "pngtuberEyesClosedMouthClosedSrc",
    pngtuberEyesClosedMouthClosedSrc
  );
  sourceUrl.searchParams.append(
    "pngtuberEyesClosedMouthOpenSrc",
    pngtuberEyesClosedMouthOpenSrc
  );
  sourceUrl.searchParams.append(
    "pngtuberEyesOpenMouthClosedSrc",
    pngtuberEyesOpenMouthClosedSrc
  );
  sourceUrl.searchParams.append(
    "pngtuberEyesOpenMouthOpenSrc",
    pngtuberEyesOpenMouthOpenSrc
  );
  sourceUrl.searchParams.append("address", address);
  sourceUrl.searchParams.append("password", password);

  return (
    <div>
      <div className="grid grid-cols-4 gap-2 mb-5">
        <div>
          <img src={pngtuberEyesClosedMouthClosedSrc} />
          <label>
            <span className="block my-2 text-sm font-medium text-slate-700">
              Eyes Closed Mouth Closed
            </span>
            <input
              className="border-2 rounded-md"
              value={pngtuberEyesClosedMouthClosedSrc}
              onChange={(e) =>
                setPngtuberEyesClosedMouthClosedSrc(e.target.value)
              }
            />
          </label>
        </div>
        <div>
          <img src={pngtuberEyesClosedMouthOpenSrc} />
          <label>
            <span className="block my-2 text-sm font-medium text-slate-700">
              Eyes Closed Mouth Open
            </span>
            <input
              className="border-2 rounded-md"
              value={pngtuberEyesClosedMouthOpenSrc}
              onChange={(e) =>
                setPngtuberEyesClosedMouthOpenSrc(e.target.value)
              }
            />
          </label>
        </div>
        <div>
          <img src={pngtuberEyesOpenMouthClosedSrc} />
          <label>
            <span className="block my-2 text-sm font-medium text-slate-700">
              Eyes Open Mouth Closed
            </span>
            <input
              className="border-2 rounded-md"
              value={pngtuberEyesOpenMouthClosedSrc}
              onChange={(e) =>
                setPngtuberEyesOpenMouthClosedSrc(e.target.value)
              }
            />
          </label>
        </div>
        <div>
          <img src={pngtuberEyesOpenMouthOpenSrc} />
          <label>
            <span className="block my-2 text-sm font-medium text-slate-700">
              Eyes Open Mouth Open
            </span>
            <input
              className="border-2 rounded-md"
              value={pngtuberEyesOpenMouthOpenSrc}
              onChange={(e) => setPngtuberEyesOpenMouthOpenSrc(e.target.value)}
            />
          </label>
        </div>
      </div>
      <div className="mb-5">
        <p>
          Make sure you have{" "}
          <a
            href="https://github.com/obsproject/obs-websocket/releases"
            className="text-blue-500 hover:text-blue-700"
          >
            OBS Websocket 5
          </a>{" "}
          installed!
        </p>
        <label>
          <span className="block my-2 text-sm font-medium text-slate-700">
            OBS Websocket Address
          </span>
          <input
            className="border-2 rounded-md"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <label>
          <span className="block my-2 text-sm font-medium text-slate-700 mr-1">
            OBS Websocket Password
          </span>
          <input
            type="password"
            className="border-2 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          <span className="block my-2 text-sm font-medium text-green-700 mr-1">
            Source URL (Copy into new OBS Browser Source)
          </span>
          <input
            className="border-2 rounded-md"
            value={sourceUrl.toString()}
            readOnly={true}
          />
        </label>
      </div>
    </div>
  );
};
export default Login;

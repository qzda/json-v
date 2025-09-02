import "./App.css";
import { version } from "../../package.json";

export default function () {
  return (
    <div>
      <h2>
        JSON V{" "}
        <span
          style={{
            fontWeight: "normal",
            fontSize: "0.8rem",
          }}
        >
          {version}
        </span>
      </h2>
      <div>
        <a
          href="https://github.com/qzda/json-v"
          target="_blank"
        >
          Github
        </a>
      </div>
    </div>
  );
}

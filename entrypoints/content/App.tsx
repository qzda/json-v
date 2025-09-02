export default function App(props: { data: any }) {
  return (
    <div>
      <Render
        data={props.data}
        deep={0}
      />
    </div>
  );
}

function Render(props: {
  data: any;
  deep: number;
  showFisrtPreBlank?: boolean;
  hasMore?: boolean;
}) {
  const { data, deep, showFisrtPreBlank = true, hasMore = false } = props;

  const endSymbol = hasMore ? "," : "";
  const prototype = Object.prototype.toString
    .call(data)
    .split(" ")
    .at(-1)
    ?.slice(0, -1);

  const [hidden, setHidden] = useState(false);

  if (prototype === "Array") {
    return (
      <div>
        <div className="bracket">
          <span>{`${getPreBlank(deep)}[${getPreBlank(1)}`}</span>
          <Tools
            data={data}
            hidden={hidden}
            setHidden={setHidden}
          />
        </div>
        {!hidden &&
          (data as any[]).map((item, index) => {
            return (
              <Render
                deep={deep + 2}
                data={item}
                key={index}
                hasMore={index < (data as any[]).length - 1}
              />
            );
          })}
        {`${getPreBlank(deep)}]${endSymbol}`}
      </div>
    );
  }

  if (prototype === "Object") {
    const keys = Object.keys(data);
    return (
      <>
        <span className="bracket">
          {`${getPreBlank(showFisrtPreBlank ? deep : 0)}{${getPreBlank(1)}`}
          <Tools
            data={data}
            hidden={hidden}
            setHidden={setHidden}
          />
        </span>
        {!hidden &&
          keys.map((key, index) => {
            return (
              <div key={index}>
                <span
                  style={{
                    color: "rebeccapurple",
                  }}
                >
                  {`${getPreBlank(deep + 2)}"${key}"`}
                </span>
                <span>{": "}</span>
                <Render
                  data={data[key]}
                  deep={deep + 2}
                  showFisrtPreBlank={false}
                  hasMore={index < keys.length - 1}
                />
              </div>
            );
          })}
        <div>{`${getPreBlank(deep)}}${endSymbol}`}</div>
      </>
    );
  }

  if (prototype === "String") {
    const isUrl = URL.canParse(data);

    return (
      <>
        <span className={prototype}>
          "
          {isUrl ? (
            <a
              href={data}
              target="_blank"
            >
              {data}
            </a>
          ) : (
            data
          )}
          "
        </span>
        {endSymbol}
      </>
    );
  }

  if (prototype === "Null") {
    return (
      <>
        <span className={prototype}>null</span>
        {endSymbol}
      </>
    );
  }

  if (prototype === "Boolean") {
    return (
      <>
        <span className={prototype}>{data ? "true" : "false"}</span>
        {endSymbol}
      </>
    );
  }

  return (
    <>
      <span className={prototype}>{data}</span>
      {endSymbol}
    </>
  );
}

function Tools(props: {
  data: any;
  hidden: Boolean;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data, hidden, setHidden } = props;
  return (
    <div className="toolbar">
      <a
        className="btn"
        onClick={() => {
          navigator.clipboard.writeText(JSON.stringify(data, null, 2));
        }}
      >
        copy
      </a>
      <a
        className="btn"
        onClick={() => {
          setHidden(!hidden);
        }}
      >
        {hidden ? "+" : "-"}
      </a>
    </div>
  );
}

function getPreBlank(deep: number) {
  if (deep < 1) return "";
  return new Array(deep).fill("\u00A0").join("");
}

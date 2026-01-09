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
      <>
        <span>
          <span className="bracket-1">{`${getPreBlank(
            showFisrtPreBlank ? deep : 0
          )}[${getPreBlank(1)}`}</span>
          <Tools
            data={data}
            hidden={hidden}
            setHidden={setHidden}
          />
        </span>
        {!hidden &&
          (data as any[]).map((item, index) => {
            return (
              <div key={index}>
                <Render
                  deep={deep + 2}
                  data={item}
                  hasMore={index < (data as any[]).length - 1}
                />
              </div>
            );
          })}
        <div className="bracket-1">{`${getPreBlank(deep)}]${endSymbol}`}</div>
      </>
    );
  }

  if (prototype === "Object") {
    const keys = Object.keys(data);
    return (
      <>
        <span>
          <span className="bracket-2">{`${getPreBlank(
            showFisrtPreBlank ? deep : 0
          )}{${getPreBlank(1)}`}</span>
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
                <span>{getPreBlank(deep + 2)}</span>
                <span
                  className="key cursor-pointer"
                  onClick={() => {
                    copyText(key);
                  }}
                >
                  "{key}"
                </span>
                <span>{": "}</span>
                <Render
                  data={data[key]}
                  deep={isNormalType(data[key]) ? 0 : deep + 2}
                  showFisrtPreBlank={false}
                  hasMore={index < keys.length - 1}
                />
              </div>
            );
          })}
        <div className="bracket-2">{`${getPreBlank(deep)}}${endSymbol}`}</div>
      </>
    );
  }

  if (prototype === "String") {
    const isUrl = URL.canParse(data);

    return (
      <>
        <span
          className={prototype}
          onClick={() => {
            copyText(data);
          }}
        >
          <span>{getPreBlank(deep)}</span>
          {isUrl ? (
            <span>
              <a
                href={data}
                className="cursor-pointer"
                target="_blank"
              >
                "{data}"
              </a>
            </span>
          ) : (
            <span className="cursor-pointer">"{data}"</span>
          )}
        </span>
        {endSymbol}
      </>
    );
  }

  return (
    <>
      <span
        className={prototype}
        onClick={() => {
          copyText(String(data));
        }}
      >
        {getPreBlank(deep)}
        <span className="cursor-pointer">{String(data)}</span>
      </span>
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
          copyText(JSON.stringify(data, null, 2));
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

function isNormalType(data: any) {
  const prototype = Object.prototype.toString
    .call(data)
    .split(" ")
    .at(-1)
    ?.slice(0, -1);

  if (!prototype) return false;

  return ["String", "Null", "Boolean", "Number"].includes(prototype);
}

function copyText(text: string) {
  navigator.clipboard.writeText(text);
}

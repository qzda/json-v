import { displayName, version, homepage } from "../../package.json";
import { useEffect, useState } from "react";
import { LucideGithub } from "./components/icons";

const i18n = {
  zh: {
    updateInfo: `🎉 发现新版本`,
    link: "前往更新",
  },
  en: {
    updateInfo: `🎉 Discover new version`,
    link: "update now",
  },
};

function getLanguage(): keyof typeof i18n {
  const lang = navigator.language.toLowerCase();
  return lang.startsWith("zh") ? "zh" : "en";
}

function compareVersion(a: string, b: string) {
  const pa = a.replace(/^v/, "").split(".").map(Number);
  const pb = b.replace(/^v/, "").split(".").map(Number);

  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const na = pa[i] || 0;
    const nb = pb[i] || 0;
    if (na > nb) return 1;
    if (na < nb) return -1;
  }
  return 0;
}

export default function App() {
  const [latest, setLatest] = useState<string | null>(null);
  const [releaseUrl, setReleaseUrl] = useState<string | null>(null);

  const [language, setLanguage] = useState<keyof typeof i18n>("en");

  useEffect(() => {
    fetch("https://api.github.com/repos/qzda/json-v/releases/latest")
      .then((res) => res.json())
      .then((data) => {
        if (data?.tag_name) {
          setLatest(data.tag_name);
          setReleaseUrl(data.html_url);
        }
      });

    setLanguage(getLanguage());
  }, []);

  const hasUpdate = latest && compareVersion(latest, version) > 0;

  return (
    <div>
      <h2
        style={{
          margin: 0,
        }}
      >
        <span>{displayName} </span>
        <span
          style={{
            fontWeight: "normal",
            fontSize: "0.8rem",
          }}
        >
          v{version}
        </span>
        <a
          href={homepage}
          target="_blank"
          rel="noreferrer"
          className="github"
        >
          <LucideGithub />
        </a>
      </h2>

      {hasUpdate && (
        <div className="update-tip">
          <span>
            {i18n[language].updateInfo} <b>{latest}</b>
          </span>
          <span>, </span>
          <span>
            <a
              href={releaseUrl!}
              target="_blank"
              rel="noreferrer"
            >
              {i18n[language].link}
            </a>
          </span>
        </div>
      )}
    </div>
  );
}

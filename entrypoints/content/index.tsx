import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";

export default defineContentScript({
  matches: ["<all_urls>", "file:///"],
  cssInjectionMode: "ui",
  runAt: "document_end",
  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: "react-ui",
      position: "inline",
      onMount(uiContainer, shadow, shadowHost) {
        const preElement = document.querySelector<HTMLPreElement>("body > pre");
        const jsonText = preElement?.innerText;

        if (jsonText) {
          try {
            const jsonData = JSON.parse(jsonText);

            preElement.style.display = "none";

            if (
              document.querySelector<HTMLDivElement>(
                ".json-formatter-container",
              )
            ) {
              document.querySelector<HTMLDivElement>(
                ".json-formatter-container",
              )!.style.display = "none";
            }

            const appElem = document.createElement("div");
            appElem.id = "app";
            uiContainer.appendChild(appElem);

            const root = ReactDOM.createRoot(appElem);
            root.render(<App data={jsonData} />);

            return root;
          } catch (error) {}
        }
      },
    });

    ui.mount();
  },
});

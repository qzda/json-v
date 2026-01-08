import { defineConfig } from "wxt";
import { displayName, version } from "./package.json";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifestVersion: 3,
  modules: ["@wxt-dev/module-react"],
  webExt: {
    startUrls: ["https://jsonplaceholder.typicode.com/users"],
  },
  outDir: "dist",
  manifest: {
    name: displayName,
    version,
  },
});

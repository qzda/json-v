# JSON V

A browser extension that makes raw JSON pages more beautiful and interactive.
Supports node collapse/expand, copy to clipboard, and improves JSON readability.

## 📷 Screenshots

![](/public/screenshots.png)

## ✨ Features

- 🌳 **Structured View**: Automatically formats JSON into a tree structure for better readability.
- 📂 **Collapse / Expand**: Toggle any level of nodes to quickly navigate large data.
- 📋 **One-Click Copy**: Copy node values or objects to clipboard with a single click.
- 🎨 **Clean UI**: Syntax highlighting and indentation for a better reading experience.
- ⚡ **Auto-Enabled**: Works automatically when opening JSON files or API responses in the browser.

## 🔧 Installation

### Chrome / Edge

1. Download the `.crx` package([Github](https://github.com/qzda/json-v/releases)).
2. Open `chrome://extensions/` in the browser.
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked** and select the project folder.

### Firefox(developing...)

## 🖥️ How to Use

1. Open any JSON page (e.g., [an API response](https://jsonplaceholder.typicode.com/users)).
2. The page will be rendered in a readable tree structure automatically.
3. Click [+/-] to expand/collapse nodes, click the copy button to copy values.

## 📜 Permissions

- Runs only on JSON pages you open.
- Does not collect or upload any personal data.

## 🛠️ Development

```bash
git clone https://github.com/qzda/json-v.git
cd json-v
npm install
npm run dev
```

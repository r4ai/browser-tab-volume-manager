<div align="center">
  <br>
  <img src="./public/images/extension_128.png" width="128">
  <br>
  <h1>browser-tab-volume-manager</h1>
  <p>Super simple browser extension <br> to adjust media volume on active tab.</p>
</div>

---

<div align="center">
  <img src="https://github.com/r4ai/browser-tab-volume-manager/actions/workflows/release.yml/badge.svg">
  <img src="https://github.com/r4ai/browser-tab-volume-manager/actions/workflows/ci.yml/badge.svg">
</div>

## Installation

### Chrome / Edge

- Go to [Releases](https://github.com/r4ai/browser-tab-volume-manager/releases/latest) and download the latest `browser-tab-volume-manager.zip` file.
- Go to the browser address bar and type `chrome://extensions`.
- Check the `Developer Mode` button to enable it.
- Drag and drop the `browser-tab-volume-manager.zip` file to the browser window.

### Firefox

- Go to [Releases](https://github.com/r4ai/browser-tab-volume-manager/releases/latest) and download the latest `browser-tab-volume-manager-firefox.zip` file.
- Go to the browser address bar and type `about:addons`.
- Click on the `Settings` button and select `Install Add-on From File...`.
- Select the `browser-tab-volume-manager-firefox.zip` file.

## Development

### Prerequisites

- [Node.js](https://nodejs.org) 16 or later installed
- [Yarn](https://yarnpkg.com) installed

### Getting Started

- `yarn install` to install dependencies.
- `yarn dev` to start the development server.
- `yarn build` to build an unpacked extension.

- **Load extension in Chrome (Chromium, Manifest V3)**

  - Go to the browser address bar and type `chrome://extensions`
  - Check the `Developer Mode` button to enable it.
  - Click on the `Load Unpacked Extension` button.
  - Select your `dist` folder in the project root.

- **Load extension in Firefox (Manifest V2)**

  - Go to the browser address bar and type `about://debugger`
  - Click on the `Load Temporary Add-on` button.
  - Select your `dist-firefox-v2` folder in the project root.

### Available Commands

- `yarn clean` to remove dist folder. `dev` and `build` commands call this command.
- `yarn format` to fix code with eslint and prettier.
- `yarn lint` to call ESLint and Prettier.
- `yarn test` for testing.

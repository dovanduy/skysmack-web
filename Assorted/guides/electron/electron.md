# Electron

## Overview
Electron uses the following files (./ refers to the project root):
    ./main.ts
    ./tsconfig-electron.ts

main.ts describes the main process of electron. main.ts also defines the renderer process. The renderer process is the javascript running in html (that means Angular is our rendering process here).

tsconfig-electron.ts describes how typescript should compile main.ts to main.js.

To run electron with hot reload in Skysmack, run the command `npm run ss:electron`. This command then runs two other commands in parallel (thanks to npm-run-all package). The command `ss` is Skysmacks custom development build command. Nothing new here. The `electron:serve` command uses the wait-on package to let the `ss` command finish the build process, then compiles main.ts to js and serves electron. Without wait-on, electron will never be served. and a standard web app would be served instead.

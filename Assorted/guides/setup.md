# Skysmack setup

## Global npm packages to install
npm i -g http-server @angular/cli npm-check-updates npm-install-peers

## Configuring the hosts file
1. Go to `C:\Windows\System32\drivers\etc`
2. Add Skysmack.Server endpoints
    ```
    # Skysmack.Server
    127.0.0.1 skysmack-io.test www.skysmack-io.test client.skysmack-io.test client1.skysmack-io.test client2.skysmack-io.test client3.skysmack-io.test
    ```
3. Add Skysmack.Client endpoints
    ```
    # Skymack.Client
    127.0.0.1 skysmack.test client.skysmack.test client1.skysmack.test client2.skysmack.test client3.skysmack.test
    ```

## Start commands
Remember to Cosmos emulator and the Skysmack backend project first.

|Description|Commabds|
|-|-|
|Start the project|`npm run ss`|
|Start the project and open in browser|`npm run ss:open`|
|Run local production build|`npm run ss:prod`|

For more commands, see the package.json file under "scripts".
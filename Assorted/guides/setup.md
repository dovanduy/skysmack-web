# Skysmack setup

## Global npm packages to install
npm i -g @angular/cli http-server lerna lighthouse typescript

## Backend stuff
- Install MSSQL + Workbench: https://dev.mysql.com/downloads/workbench/
    + Remember to click the banner, not the little download button.
- Install Google Cloud Emulator SDK (remember to install beta commands)
    + See this guide for setup: https://cloud.google.com/datastore/docs/tools/datastore-emulator
- Build the back end
- Run npm i in portal.ui (for swagger)
- Seed the database (see seeding-backend.md)

## Configuring the hosts file
1. Go to `C:\Windows\System32\drivers\etc`
2. Add below
    # Skymsmack.Server
    127.0.0.1 skysmack-io.test www.skysmack-io.test client.skysmack-io.test client1.skysmack-io.test client2.skysmack-io.test client3.skysmack-io.test

    # Skymack.Angular
    127.0.0.1 skysmack.test www.skysmack.test client.skysmack.test client1.skysmack.test client2.skysmack.test client3.skysmack.test

## Start commands
See ng-skysmack\package.json scripts section for possible commands.
# Skysmack setup

This text describes how to run this repo (skysmack-web) for the first time on your development machine.

1. Configure the host file
    - Go to `C:\Windows\System32\drivers\etc`
    - Add below to the hosts file
            # Skymsmack.Server
            127.0.0.1 skysmack-io.test www.skysmack-io.test client.skysmack-io.test client1.skysmack-io.test client2.skysmack-io.test client3.skysmack-io.test

            # Skymack.Angular
            127.0.0.1 skysmack.test www.skysmack.test client.skysmack.test client1.skysmack.test client2.skysmack.test client3.skysmack.test
2. Run setup.ps1 under tools\scripts
3. Clone and setup skysmack-api.
4. From tools in skysmack-api, run start-frontend.ps1 (when prompted, use `f`).
5. Done!

# Adding skysmack-test-cert.

If you want to run a local production version of skysmack for testing offline/PWA functionality, you will need to install an ssl certificate. The guide below shows you how.

1. On your keyboard, click: <Windows Key> + R
2. Write mmc and click enter.
3. In upper left, click 'File' -> ' Add/Remove Snap-in…'
4. From the list, select 'Certificates', then 'Add' -> Ok to default option
5. In the left column, open 'Certificates - Current User' -> Click on 'Trusted Root Certification Authorities' -> Right click on Certificates -> All Tasks -> Import
6. Follow the guide. When prompted to select the cert file, browse to skysmack-web/tools/certificates and choose skysmack-test-cert.pem
7. Finish the guide and you are done.
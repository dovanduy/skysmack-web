# Adding skysmack-test-cert.
If you want to run a local production version of skysmack for testing offline/PWA functionality, you will need to install an ssl certificate. The guide below shows you how.

1. On your keyboard, click: <Windows Key> + R
2. Write mmc and click enter.
3. In upper left, click 'File' -> ' Add/Remove Snap-in…'
4. From the list, select 'Certificates', then 'Add' -> Ok to default option
5. In the left column, open 'Certificates - Current User' -> Click on 'Trusted Root Certification Authorities' -> Right click on Certificates -> All Tasks -> Import
6. Follow the guide. When prompted to select the cert file, browse to skysmack-web/tools/certificates and choose skysmack-test-cert.pem
7. Finish the guide and you are done. Note you don't have to 'Save to console'. 

## Bonus: Creating new certificates
In tools/certificates copy skysmack-test.cnf to desktop. From there you can modify it as needed and run the below commands from Git Bash to create new cert files (Note: To paste commands in Git bash, right click -> paste).

***CRT***
openssl req -new -x509 -newkey rsa:2048 -sha256 -nodes -keyout skysmack-test.key -days 3560 -out skysmack-test.crt -config skysmack-test.cnf

***PEM***
openssl req -new -x509 -newkey rsa:2048 -sha256 -nodes -keyout key.pem -days 3560 -out skysmack-test-certificate.pem -config skysmack-test.cnf
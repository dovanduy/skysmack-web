# Seeding backend

## Steps
- Stop all running services (gcloud, dotnet run etc.)
- Delete the file in C:\Users\mjh\AppData\Roaming\gcloud\emulators\datastore\WEB-INF\appengine-generated
- Run gcloud beta emulators datastore start --host-port=localhost:8900
    + Run gcloud it again.
- Open mysql and delete old databases.
- Open VS 2017 and run Tools/dotnet-SkysmackDbSeeding via right click -> Debug -> Start new instance
    + You haven't started gcloud emulator if the tool is frozen
- Run the seeding tool with "-g" to seed cosmos
- Run the backend: dotnet run
- Open http://client1.skysmack-io.test:2000 and http://www.skysmack-io.test:2000 to create databases
- Run the seeding tool with 
    + To seed access policies: -t www.client1.test -a
    + To seed packages: -t www.client1.test --packages
    + To seed users: -t www.client1.test -p identities -e
- Go to Skysmack\tools\OpenApi.Ui -> Run npm i -> Run gulp
- Verify that swagger works, visit http://client1.skysmack.test:5000/swagger.html and "Explore" this url: http://client1.skysmack-io.test:2000/open-api

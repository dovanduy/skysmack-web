# current folder path
$location = get-location

# google datastore emulator
start start-datastore-emulator.bat

# docs (swagger + re-doc)
cd "$location\OpenApi.Ui"
start powershell -argument "gulp"

# backend
cd "$location\..\src\Servers\Portal"
start powershell -argument "dotnet run"

# frontend runner
cd "$location\..\..\skysmack-refactor\ng-skysmack"
start powershell -argument "npm run ss:c1:open"

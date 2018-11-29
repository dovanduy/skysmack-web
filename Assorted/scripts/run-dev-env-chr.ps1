#Write-Host "$skysmack\tools"
#Read-Host -Prompt "enter"

# current folder path
$location = get-location
$skysmack = (get-item $location).parent.parent.parent.FullName + "\Skysmack"
$angular = (get-item $location).parent.parent.FullName

# google datastore emulator
cd "$skysmack\tools";
start start-datastore-emulator.bat

# docs (swagger + re-doc)
cd "$skysmack\tools\OpenApi.Ui";
start powershell -argument "gulp"

# backend
cd "$skysmack\src\Servers\Portal"
start powershell -argument "dotnet run"

# frontend runner
cd "$angular\ng-skysmack"
start powershell -argument "npm run ss:c1:open"

# IDEs
cd "$angular"
code .
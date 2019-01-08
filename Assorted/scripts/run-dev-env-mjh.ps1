#Write-Host "$skysmack\tools"
#Read-Host -Prompt "enter"

# current folder path
$location = get-location
$skysmack = (get-item $location).parent.parent.parent.FullName + "\Skysmack"
$angular = (get-item $location).parent.parent.FullName
$oldAngular = (get-item $angular).parent.FullName + "\Skysmack.Angular"

# google datastore emulator
cd "$skysmack\tools";
start start-datastore-emulator.bat

# docs (swagger + re-doc)
cd "$skysmack\tools\OpenApi.Ui";
start powershell -argument "-noexit", "gulp"

# backend
cd "$skysmack\src\Servers\Portal"
start powershell -argument "-noexit", "dotnet run"

# frontend runner
cd "$angular\ng-skysmack"
start powershell -argument "-noexit", "npm run ss:c1:open"

# IDEs
cd "$angular"
code .
cd $oldAngular
code .
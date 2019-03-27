#Write-Host "$skysmack\tools"
#Read-Host -Prompt "enter"

# current folder path
$location = get-location
$skysmack = (get-item $location).parent.parent.parent.FullName + "\skysmack-api"
$angular = (get-item $location).parent.parent.FullName

# Full or quick startup
$type = Read-Host "Enter 'f' for rebuild/first time builds, or 'q' for quick startup (npm packages etc. must exist)."
If ($type -eq "f") {
    # frontend runner
    cd "$angular\ng-skysmack"
    start powershell -argument "-noexit", "npm run ss:init"

    # Lerna
    cd "$angular\ng-skysmack"
    start powershell -argument "-noexit", "npm run ss:lerna:watch"
} 
ElseIf ($type -eq "q") {
    # Lerna
    cd "$angular\ng-skysmack"
    start powershell -argument "-noexit", "npm run ss:lerna:watch"
    # frontend runner
    cd "$angular\ng-skysmack"
    start powershell -argument "-noexit", "npm run ss:c1:open"
} 

# google datastore emulator
cd "$skysmack\tools";
start start-datastore-emulator.bat

# docs (swagger + re-doc)
cd "$skysmack\tools\OpenApi.Ui";
start powershell -argument "-noexit", "gulp"

# backend
cd "$skysmack\src\Servers\Portal"
start powershell -argument "-noexit", "dotnet run"

# IDEs
cd "$angular"
code .

exit
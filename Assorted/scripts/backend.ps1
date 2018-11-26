# current folder path
$location = get-location
$skysmack = (get-item $location).parent.parent.parent.FullName + "\Skysmack"

cd "$skysmack\src\Servers\Portal"
start powershell -argument "dotnet run"
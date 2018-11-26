# current folder path
$location = get-location
$skysmack = (get-item $location).parent.parent.parent.FullName + "\Skysmack"

# docs (swagger + re-doc)
cd "$skysmack\tools\OpenApi.Ui";
start powershell -argument "gulp"
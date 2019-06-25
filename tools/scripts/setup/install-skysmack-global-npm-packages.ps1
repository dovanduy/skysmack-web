write-host "`n----------------------------"
write-host "Installing required global npm packages "
write-host "----------------------------`n"

# NPM Package versions
$gulp_cli_version = ">=2.0.1 <=2.0.1"
$angular_cli_version = ">=8.0.0 <=8.0.0"
$http_server_version = ">=0.11.1 <=0.11.1"
$typescript_version = ">=3.4.5 <=3.4.5"
$yarn_version = ">=1.15.2 <=1.15.2"

# Gulp cli
write-host "Installing gulp-cli"
npm i -g "gulp-cli@$gulp_cli_version"

# Angular cli
write-host "Installing angular-cli"
npm i -g "@angular/cli@$angular_cli_version"

# Http-server
write-host "Installing http-server"
npm i -g "http-server@$http_server_version"

# Typescript
write-host "Installing typescript"
npm i -g "typescript@$typescript_version"

# Yarn
write-host "Installing yarn"
npm i -g "yarn@$yarn_version"

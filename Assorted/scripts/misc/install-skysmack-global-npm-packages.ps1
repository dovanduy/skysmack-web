write-host "`n----------------------------"
write-host "Installing required global npm packages "
write-host "----------------------------`n"

# NPM Package versions
$gulp_cli_version = ">=1.2.2 <=2.0.1"
$angular_cli_version = ">=7.3.2 <=7.3.5"
$http_server_version = ">=0.11.1 <=0.11.1"
$lerna_version = ">=3.10.7 <=3.10.7"
$typescript_version = ">=3.2.4 <=3.2.4"

# Gulp cli
write-host "Installing gulp-cli"
npm i -g "gulp-cli@$gulp_cli_version"

# Angular cli
write-host "Installing angular-cli"
npm i -g "@angular/cli@$angular_cli_version"

# Http-server
write-host "Installing http-server"
npm i -g "http-server@$http_server_version"

# Lerna
write-host "Installing lerna"
npm i -g "lerna@$lerna_version"

# Typescript
write-host "Installing typescript"
npm i -g "typescript@$typescript_version"
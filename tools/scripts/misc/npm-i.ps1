### NPM packages install

write-host "`n----------------------------"
write-host " npm packages installation  "
write-host "----------------------------`n"

# NPM Package versions
$gulp_cli_version = ">=1.2.2 <=2.0.1"
$angular_cli_version = ">=7.3.2 <=7.3.5"
$http_server_version = ">=0.11.1 <=0.11.1"
$typescript_version = ">=3.2.4 <=3.2.4"

# Gulp cli
$install_gulp_cli = $TRUE

if (Get-Command gulp -errorAction SilentlyContinue) {
    $gulp_cli_prev_v = (gulp -v)
}

if ($gulp_cli_prev_v) {
    write-host "Gulp cli is already installed"
    
    $confirmation = read-host "Are you sure you want to replace this version ? [y/n]"
    if ($confirmation -ne "y") {
        $install_gulp_cli = $FALSE
    }
}

if ($install_gulp_cli) {
    write-host "Installing gulp-cli"
    npm i -g "gulp-cli@$gulp_cli_version"
}

# Angular cli
$install_angular_cli = $TRUE

if (Get-Command ng -errorAction SilentlyContinue) {
    $angular_cli_prev_v = (ng -v)
}

if ($angular_cli_prev_v) {
    write-host "Angular cli is already installed"
    
    $confirmation = read-host "Are you sure you want to replace this version ? [y/n]"
    if ($confirmation -ne "y") {
        $install_angular_cli = $FALSE
    }
}

if ($install_angular_cli) {
    write-host "Installing angular-cli"
    npm i -g "@angular/cli@$angular_cli_version"
}

# Http-server
$install_http_server = $TRUE

if (Get-Command http-server -errorAction SilentlyContinue) {
    $http_server_prev_v = (http-server -h)
}

if ($http_server_prev_v) {
    write-host "Http-server is already installed"
    
    $confirmation = read-host "Are you sure you want to replace this version ? [y/n]"
    if ($confirmation -ne "y") {
        $install_http_server = $FALSE
    }
}

if ($install_http_server) {
    write-host "Installing http-server"
    npm i -g "http-server@$http_server_version"
}

# Typescript
$install_typescript = $TRUE

if (Get-Command tsc -errorAction SilentlyContinue) {
    $typescript_prev_v = (tsc -v)
}

if ($typescript_prev_v) {
    write-host "Typescript is already installed"
    
    $confirmation = read-host "Are you sure you want to replace this version ? [y/n]"
    if ($confirmation -ne "y") {
        $install_typescript = $FALSE
    }
}

if ($install_typescript) {
    write-host "Installing typescript"
    npm i -g "typescript@$typescript_version"
}


write-host "`nAll done!`n"
read-host "Press any key to exit..."
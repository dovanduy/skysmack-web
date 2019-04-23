## Intro
write-host "`n----------------------------"
write-host "Setting up Skysmack local development"
write-host "----------------------------"

### NodeJS
& "$PSScriptRoot\misc\install-nodejs.ps1"

### NPM packages
& "$PSScriptRoot\misc\install-skysmack-global-npm-packages.ps1"
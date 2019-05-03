## Intro
write-host "`n----------------------------"
write-host "Setting up Skysmack local development"
write-host "----------------------------"

### NodeJS
& "$PSScriptRoot\setup\install-nodejs.ps1"

### NPM packages
& "$PSScriptRoot\setup\install-skysmack-global-npm-packages.ps1"

write-host ""
read-host "Press enter to exit..."

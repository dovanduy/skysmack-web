## Intro
write-host "`n----------------------------"
write-host "Setting up Skysmack local development"
write-host "----------------------------"

### NodeJS
& "$PSScriptRoot\setup\install-nodejs.ps1"

### NPM packages
& "$PSScriptRoot\setup\install-skysmack-global-npm-packages.ps1"

write-host "Done! To start the local dev env, run: C:\Users\<USERNAME>\Source\Repos\skysmack-api\tools\start-frontend.ps1 - Remember to setup and seed the backend first."
write-host ""
read-host "Press enter to exit..."
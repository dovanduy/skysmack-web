# New Skysmack Package

- Create folder with name.
    packages-rabbits

- Add base files and foldes (copy from another project e.g. packages-persons). Structure should look like this:
    packages-rabbits/
        /lib
            index.ts
        index.ts
        package.json
        tsconfig.json

- Ensure package.json has the correct project name.

- Add a linking script to ng-skysmack/package.json scripts section. It should something like this
    "link:packages-rabbits": ""

- Ensure peerDependencies are installed in the linking script above via npm-install-peers. See the script for "link:packages-authentication" for example.

- Update "ss:link" in ng-skysmack/package.json with the new "link:packages-rabbit". Remember it MUST come after any other packages it is linking to.

- Update the clean.bat script in ng-skysmack/package.json.
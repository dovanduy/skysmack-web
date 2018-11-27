# New Skysmack Package


## 1st: Setup npm package
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

## 2nd: Setup build flow
- Add a linking script to ng-skysmack/package.json scripts section. It should something like this
    "link:packages-rabbits": ""

- Ensure peerDependencies are installed in the linking script above via npm-install-peers. See the script for "link:packages-authentication" for example.

- Update "ss:link" in ng-skysmack/package.json with the new "link:packages-rabbit". Remember it MUST come after any other packages it is linking to.

- Update the clean.bat script in ng-skysmack/package.json.

- Remember to add the new linking script to any other linking scripts that depend on it. "link:ng-skysmack" is dependant on ALL packages (so far), so remember to update that.

## 3rd: Implement package logic
- Add framework/platform INDEPENDANT files, services, etc.
    > Platform independant examples (do add)
        redux reducer/epics
        most data models
    > Platform dependant examples (don't add)
        redux actions/requets/store (these use @Injectable, ngRedux, HttpClient, etc., all angular specific things)

## 3rd: Implement logic and views foreach platform/framework
- Angular
    > For angular, go to ng-skysmack/ng-packages (for logic) and ng-skysmack/portal-packages (for views and routing)
    > ng-packages should implement things like
        fields-config.ts
        menu.ts
        validation.ts
        redux/
            actions.ts
            requests.ts
            store.ts
    > portal-packages should implement things like
        index.component.ts
        create.component.ts
        edit.component.ts
        etc.
- React, Vue, etc: Coming (yeah right..) soon!
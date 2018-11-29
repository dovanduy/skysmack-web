# New Skysmack Package

## Part 1: Create package
- Create folder name e.g. "packages-products"
- Add base structure (copy from packages persons)
    /lib
        temp.ts
        index.ts
    index.ts
    package.json <-- Ensure correct package name e.g.
    tsconfig.json
- Setup build flow
    > ng-skysmack/package.json -> "link:packages-products": "..."
        >> If any peerDeps, add npm-install-peers. See "link:packages-authentication"
    > ng-skysmack/package.json -> Update "ss:link"
        >> Must come after other packages.
    > ng-skysmack/package.json -> Add @skysmack/packages-products to link scripts that needs it.
    > ng-skysmack/clean.bat -> Add cleaning for package

## Part 2: NPM package (logic)
packages-persons
    lib/
        models/
            person.ts
        redux/
            persons-epics.ts
            persons-reducer.ts
        persons-type.ts
        package.json
        tsconfig.json

## Part 3: Ng-Skysmack -> src/lib/ng-packages (angular logic)
persons
    redux/
        ng-persons-actions.ts
        ng-persons-requets.ts
        ng-persons-store.ts
    ng-persons-fields-config.ts
    ng-persons-menu.ts
    ng-persons-validation.ts
    ng-persons.module.ts

## Part 4: Ng-Skysmack -> src/lib/portal-packages (angular views)
persons
    components/
        persons-create/
        persons-edit/
        persons-index/
        persons-component.ts
    persons-routing.module.ts
    persons.module.ts

## Part 5: Ng-skysmack -> src/lib/projects/web-portal/src/app (angular config)
- Add package-manifest.ts to packages/
- Configure start/application-startup.ts
    > Add the new package to the package loaders array.
- Coonfigure start/start.module.ts
    > Add portals-packages module import statement
    > Add route

# Checklist

## Staging
- Browsers
- Mobile platforms

## Local production build
- Incognito
    > Must run here
- Dist
    > bundle size
    > file structure
    > assets
- CRUD
    > Lazy loading
    > create, read, update, delete (online + offline, with field + without field)
    > fields crud (online + offline)
    > pagination, sort, filter
    > validation
    > form rules
    > menu (standard + dynamic)
    > package extension (adaptor, feature)
- Security
    > anon, auth, roles, permissions
- Translation
- PWA
    > Lighthouse scan

## Code
- Architecture
    > packages
    > redux
    > references
        framework <- redux <- package <- framework (angular/vue/etc)
- Redux
    > no mutated state
    > all state cloned
- Build flow
    > linking
    > cleaning
- Naming conventions
    > singularis vs pluralis
        models
        redux
        folders
    > classes
        properties
        constructor
        methods -> name, params, return value, size
    > filename match content
- package.json
    > deps, devDeps, peerDeps
- tsconfig.json

## Future
- Logging (errors, performance, misc)
- Preload strategy
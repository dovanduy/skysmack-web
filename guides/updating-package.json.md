# Updating package.json

1. Install ncu globally: `npm i npm-check-updates -g`
2. Run `ncu` and review possible updates.
3. Run `npm update --save/--save-dev`
    - This updates the minor and patch versions. E.g. 1.4.5 -> 1.5.4
4. Check package.json changes in git
    - If everything looks good, try to run the program and see if it works. *Remember to run `npm i` if necessary.*
    - Reverse dependencies to lower versions if needed.
    - Commit the update if it works.
4. Run `ncu` to see what have not been updated.
5. Do one of the following, then repeat step 4.
    - Run `ncu -a` to update all the remaining dependencies to their latest version (recommended)
    - Run `ncu -a <regex-expression>` to update all dependencies matching the regex to their latest version
    - Search for individual packages on google, and update them individually.

## Remember
- You can hover the mouse over a version number in package.json to see its newest version (works in vs code).
- It's a good thing to also check the github repos sometimes, as important information is sometimes displayed.
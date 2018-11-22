# Git commands

|Description|Command|
|-|-|
|Update git|`git update-git-for-windows`|
|Publish master (remember to pull the newest master first)|`git checkout published-to-azure;git reset --hard master;git push --force;git checkout master;`|
|Prune branches|`git remote update origin --prune`|
|Branch from commit|`git branch <branchname> <sha1-of-commit>`|
|Publish additional branch|`git push -u origin <branch-name>`|
|Delete local branch|`git branch -d <branch-name>`|
|Delete remote branch|`git push -d origin <branch-name>`|
|Get remote branch|`git checkout --track origin/<branch-name>`|
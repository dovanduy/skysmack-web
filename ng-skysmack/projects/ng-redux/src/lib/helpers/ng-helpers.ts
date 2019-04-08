import { Router } from '@angular/router';

export const getAdditionalPaths = (router: Router, packagePath): string[] => {
    const chuncks = router.url.split('/');
    const additionalPaths: string[] = [];
    for (let chunck of chuncks) {
        if (chunck === 'edit' || chunck === 'create') {
            break;
        }

        if (chunck !== '' && chunck !== 'fields' && chunck !== 'settings' && chunck !== packagePath) {
            additionalPaths.push(chunck);
        }
    }
    return additionalPaths;
};

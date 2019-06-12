import { Oauth2Type } from '@skysmack/packages-oauth2';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';

export class Oauth2PackageManifest extends Oauth2Type implements PackageManifest {
    public icon = 'lock';
    public menuLocation = '';
    public modulePath = () => import('@skysmack/portal-packages').then(m => m.Oauth2Module);
}

export function loadOauth2Package(packageLoader: PackageLoader) {
    return () => packageLoader.add(new Oauth2PackageManifest());
}

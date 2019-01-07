import { PackageManifest } from '@skysmack/ng-ui';
import { PackageLoader } from '@skysmack/ng-packages';
import { Oauth2Type } from '@skysmack/packages-oauth2';

export class Oauth2PackageManifest extends Oauth2Type implements PackageManifest {
    public icon = 'lock';
    public menuLocation = 'main';
    public modulePath = './../packages/modules/oauth2_wrapper.module#OAuth2WrapperModule';
}

export function loadOauth2Package(packageLoader: PackageLoader) {
    return () => packageLoader.add(new Oauth2PackageManifest());
}

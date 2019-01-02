// DO NOT DELETE - BUILD FAILS IF REMOVED >:(
import { Oauth2Module } from '../../../../../projects/portal-packages/src/lib/oauth2/oauth2.module';


import { PackageManifest } from '@skysmack/ng-ui';
import { PackageLoader } from '@skysmack/ng-packages';
import { Oauth2Type } from '@skysmack/packages-oauth2';

export class Oauth2PackageManifest extends Oauth2Type implements PackageManifest {
    public icon = 'lock';
    public menuLocation = 'main';
    public modulePath = '../../../../../projects/portal-packages/src/lib/oauth2/oauth2.module#Oauth2Module';
}

export function loadOauth2Package(packageLoader: PackageLoader) {
    return () => packageLoader.add(new Oauth2PackageManifest());
}

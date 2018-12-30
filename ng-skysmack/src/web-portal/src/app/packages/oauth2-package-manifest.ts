// DO NOT DELETE - BUILD FAILS IF REMOVED >:(
import { Oauth2Module } from '../../../../../lib/portal-packages/oauth2/oauth2.module';


import { PackageManifest } from '../../../../../lib/portal-ui/models/package-manifest';
import { PackageLoader } from 'lib/ng-packages/skysmack/packages/package-loader';
import { Oauth2Type } from '@skysmack/packages-oauth2';

export class Oauth2PackageManifest extends Oauth2Type implements PackageManifest {
    public icon = 'lock';
    public menuLocation = 'main';
    public modulePath = '../../../../../lib/portal-packages/oauth2/oauth2.module#Oauth2Module';
}

export function loadOauth2Package(packageLoader: PackageLoader) {
    return () => packageLoader.add(new Oauth2PackageManifest());
}

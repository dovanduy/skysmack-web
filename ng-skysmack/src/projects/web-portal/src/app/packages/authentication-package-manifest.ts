// DO NOT DELETE - BUILD FAILS IF REMOVED >:(
import { AuthenticationModule } from '../../../../../lib/portal-packages/authentication/authentication.module';


import { PackageManifest } from '../../../../../lib/portal-ui/models/package-manifest';
import { PackageLoader } from 'lib/ng-packages/skysmack/packages/package-loader';
import { AuthenticationType } from '@skysmack/packages-authentication';

export class AuthenticationPackageManifest extends AuthenticationType implements PackageManifest {
    public icon = 'lock';
    public menuLocation = 'main';
    public modulePath = '../../../../../lib/portal-packages/authentication/authentication.module#AuthenticationModule';
}

export function loadAuthenticationPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new AuthenticationPackageManifest());
}

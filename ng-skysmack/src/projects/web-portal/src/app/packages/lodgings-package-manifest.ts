// DO NOT DELETE - BUILD FAILS IF REMOVED >:(
import { LodgingsModule } from './../../../../../lib/portal-packages/lodgings/lodgings.module';

import { LodgingType } from '@skysmack/packages-lodgings';
import { PackageManifest } from './../../../../../lib/portal-ui/models/package-manifest';
import { PackageLoader } from 'lib/ng-packages/skysmack/packages/package-loader';

export class LodgingsPackageManifest extends LodgingType implements PackageManifest {
    public icon = 'face';
    public menuLocation = 'main';
    public modulePath = '../../../../../lib/portal-packages/lodgings/lodgings.module#LodgingsModule';
}

export function loadLodgingPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new LodgingsPackageManifest());
}

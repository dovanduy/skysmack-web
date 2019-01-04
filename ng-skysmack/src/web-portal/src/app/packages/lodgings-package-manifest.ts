import { LodgingsType } from '@skysmack/packages-lodgings';
import { PackageManifest } from '@skysmack/ng-ui';
import { PackageLoader } from '@skysmack/ng-packages';

export class LodgingsPackageManifest extends LodgingsType implements PackageManifest {
    public icon = 'domain';
    public menuLocation = 'main';
    public modulePath = '../../../../../dist/portal-packages/lib/lodgings/lodgings.module#LodgingsModule';
}

export function loadLodgingPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new LodgingsPackageManifest());
}

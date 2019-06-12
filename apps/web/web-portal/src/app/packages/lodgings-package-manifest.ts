import { LodgingsType } from '@skysmack/packages-lodgings';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';


export class LodgingsPackageManifest extends LodgingsType implements PackageManifest {
    public icon = 'domain';
    public menuLocation = 'main';
    public modulePath = () => import('@skysmack/portal-packages').then(m => m.LodgingsModule);
}

export function loadLodgingPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new LodgingsPackageManifest());
}

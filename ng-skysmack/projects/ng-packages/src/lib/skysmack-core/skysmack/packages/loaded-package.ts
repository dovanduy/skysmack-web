import { Package } from '@skysmack/framework';
import { PackageManifest } from '@skysmack/ng-ui';

export class LoadedPackage {
    constructor(
        public _package: Package,
        public packageManifest: PackageManifest
    ) { }
}

import { InstalledPackageViewModel } from '@skysmack/packages-skysmack';
import { PackageManifest } from '@skysmack/framework';

export class Package {
    constructor(
        public installedPackage: InstalledPackageViewModel,
        public packageManifest: PackageManifest
    ) { }
}

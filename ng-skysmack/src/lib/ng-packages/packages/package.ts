import { InstalledPackageViewModel } from '@skysmack/packages-skysmack';
import { PackageManifest } from 'lib/portal-ui';

export class Package {
    constructor(
        public installedPackage: InstalledPackageViewModel,
        public packageManifest: PackageManifest
    ) { }
}

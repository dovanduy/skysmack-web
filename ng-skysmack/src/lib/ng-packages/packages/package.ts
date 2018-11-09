import { InstalledPackageViewModel } from '@skysmack/packages-skysmack';
import { PackageManifest } from './../../portal-ui/models/package-manifest';

export class Package {
    constructor(
        public installedPackage: InstalledPackageViewModel,
        public packageManifest: PackageManifest
    ) { }
}

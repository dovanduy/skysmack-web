import { Package } from '@skysmack/framework';
import { PackageManifest } from './../../../portal-ui/models/package-manifest';

export class LoadedPackage {
    constructor(
        public _package: Package,
        public packageManifest: PackageManifest
    ) { }
}

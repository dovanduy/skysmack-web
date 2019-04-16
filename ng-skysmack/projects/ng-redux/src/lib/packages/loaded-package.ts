import { Package } from '@skysmack/framework';
import { PackageManifest } from './package-manifest';

export class LoadedPackage {
    constructor(
        public _package: Package,
        public packageManifest: PackageManifest
    ) { }
}


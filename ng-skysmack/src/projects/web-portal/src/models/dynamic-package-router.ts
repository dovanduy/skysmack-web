import { Routes } from '@angular/router';
import { PackageManifest } from '@skysmack/framework';


export abstract class DynamicPackageRouter {
    abstract componentPaths: Routes;
    abstract packageManifest: PackageManifest;
}

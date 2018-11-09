import { Routes } from '@angular/router';
import { PackageManifest } from './../../../../lib/portal-ui/models/package-manifest';

export abstract class DynamicPackageRouter {
    abstract componentPaths: Routes;
    abstract packageManifest: PackageManifest;
}

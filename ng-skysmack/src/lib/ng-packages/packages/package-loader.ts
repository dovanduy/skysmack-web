import { Injectable } from '@angular/core';
import { Package } from './package';
import { InstalledPackageViewModel } from '@skysmack/packages-skysmack';
import { PackageManifest } from './../../portal-ui/models/package-manifest';


@Injectable({ providedIn: 'root' })
export class PackageLoader {
    public static packageManifests: PackageManifest[] = [];
    private packageManifests: PackageManifest[] = [];

    constructor() { }

    public static getAll(): PackageManifest[] {
        return PackageLoader.packageManifests;
    }

    public static toPackage(packageViewModel: InstalledPackageViewModel): Package {
        const matchingManifest: PackageManifest = PackageLoader
            .getAll()
            .filter(packageManifest => packageManifest.id === packageViewModel.type)[0];

        return new Package(packageViewModel, matchingManifest);
    }

    public add(packageManifest: PackageManifest): Promise<any> {
        return new Promise((resolve, reject) => {
            PackageLoader.packageManifests.push(packageManifest);
            this.packageManifests.push(packageManifest);
            resolve();
        });
    }

    public getAll(): PackageManifest[] {
        return this.packageManifests;
    }

    public toPackage(packageViewModel: InstalledPackageViewModel): Package {
        const matchingManifest: PackageManifest = this
            .getAll()
            .filter(packageManifest => packageManifest.id === packageViewModel.type)[0];

        return new Package(packageViewModel, matchingManifest);
    }
}

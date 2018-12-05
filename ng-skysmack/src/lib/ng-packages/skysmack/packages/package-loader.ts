import { Injectable } from '@angular/core';
import { LoadedPackage } from './loaded-package';
import { Package } from '@skysmack/packages-skysmack';
import { PackageManifest } from './../../../portal-ui/models/package-manifest';


@Injectable({ providedIn: 'root' })
export class PackageLoader {
    public static packageManifests: PackageManifest[] = [];
    private packageManifests: PackageManifest[] = [];

    constructor() { }

    public static getAll(): PackageManifest[] {
        return PackageLoader.packageManifests;
    }

    public static toLoadedPackage(packageViewModel: Package): LoadedPackage {
        const matchingManifest: PackageManifest = PackageLoader
            .getAll()
            .filter(packageManifest => packageManifest.id === packageViewModel.type)[0];

        return new LoadedPackage(packageViewModel, matchingManifest);
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

    public toLoadedPackage(packageViewModel: Package): LoadedPackage {
        const matchingManifest: PackageManifest = this
            .getAll()
            .filter(packageManifest => packageManifest.id === packageViewModel.type)[0];

        return new LoadedPackage(packageViewModel, matchingManifest);
    }
}

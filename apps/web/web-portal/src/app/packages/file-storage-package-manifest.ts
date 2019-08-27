import { FileStorageType, FileStorageTypeId } from '@skysmack/package-types';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { TenantPackageLoadStrategy } from '../start/tenant-package-load-strategy';
import { Route } from '@angular/router';

export class FileStoragePackageManifest extends FileStorageType implements PackageManifest {
    public static modulePath = './../packages/modules/file_storage_wrapper.module#FileStorageWrapperModule';
    public icon = 'cloud_upload';
    public menuLocation = 'main';
    public modulePath = FileStoragePackageManifest.modulePath;
}

export function loadFileStoragePackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new FileStoragePackageManifest());
}

export const fileStorageRoute = { path: TenantPackageLoadStrategy.URL_PREFIX + FileStorageTypeId, loadChildren: FileStoragePackageManifest.modulePath } as Route;
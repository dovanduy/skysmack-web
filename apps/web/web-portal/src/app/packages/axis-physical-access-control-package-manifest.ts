import { AxisPhysicalAccessControlType, AxisPhysicalAccessControlTypeId } from '@skysmack/package-types';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { TenantPackageLoadStrategy } from '../start/tenant-package-load-strategy';
import { Route } from '@angular/router';

export class AxisPhysicalAccessControlPackageManifest extends AxisPhysicalAccessControlType implements PackageManifest {
    public static modulePath = './../packages/modules/axis_physical_access_control_wrapper.module#AxisPhysicalAccessControlWrapperModule'
    public icon = '';
    public menuLocation = '';
    public modulePath = AxisPhysicalAccessControlPackageManifest.modulePath;
}

export function loadAxisPhysicalAccessControlPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new AxisPhysicalAccessControlPackageManifest());
}

export const axisPhysicalAccessControlRoute = { path: `${TenantPackageLoadStrategy.URL_PREFIX}${AxisPhysicalAccessControlTypeId}`, loadChildren: AxisPhysicalAccessControlPackageManifest.modulePath, data: { type: AxisPhysicalAccessControlTypeId } } as Route;
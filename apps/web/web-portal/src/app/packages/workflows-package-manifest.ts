import { WorkflowsType, WorkflowsTypeId } from '@skysmack/package-types';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { TenantPackageLoadStrategy } from '../start/tenant-package-load-strategy';
import { Route } from '@angular/router';

export class WorkflowsPackageManifest extends WorkflowsType implements PackageManifest {
    public static modulePath = './../packages/modules/workflows_wrapper.module#WorkflowsWrapperModule';
    public icon = 'account_tree';
    public menuLocation = 'main';
    public modulePath = WorkflowsPackageManifest.modulePath;
}

export function loadWorkflowsPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new WorkflowsPackageManifest());
}

export const workflowsRoute = { path: TenantPackageLoadStrategy.URL_PREFIX + WorkflowsTypeId, loadChildren: WorkflowsPackageManifest.modulePath } as Route;
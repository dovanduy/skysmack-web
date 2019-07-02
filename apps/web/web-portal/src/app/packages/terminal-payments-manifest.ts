import { TerminalPaymentsType } from '@skysmack/packages-terminal-payments';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { Route } from '@angular/router';
import { TenantPackageLoadStrategy } from '../start/TenantPackageLoadStrategy';

export class TerminalPaymentsPackageManifest extends TerminalPaymentsType implements PackageManifest {
    public static modulePath = './../packages/modules/terminal_payments_wrapper.module#TerminalPaymentsWrapperModule';
    public icon = 'payment';
    public menuLocation = 'main';
    public modulePath = TerminalPaymentsPackageManifest.modulePath;
}

export function loadTerminalPaymentsPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new TerminalPaymentsPackageManifest());
}

export const terminalPaymentsRoute = { path: TenantPackageLoadStrategy.URL_PREFIX + TerminalPaymentsPackageManifest.id, loadChildren: TerminalPaymentsPackageManifest.modulePath } as Route;
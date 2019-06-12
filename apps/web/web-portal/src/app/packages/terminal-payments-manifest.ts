import { TerminalPaymentsType } from '@skysmack/packages-terminal-payments';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';

export class TerminalPaymentsPackageManifest extends TerminalPaymentsType implements PackageManifest {
    public icon = 'payment';
    public menuLocation = 'main';
    public modulePath = () => import('@skysmack/portal-packages').then(m => m.TerminalPaymentsModule);
}

export function loadTerminalPaymentsPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new TerminalPaymentsPackageManifest());
}

import { TerminalPaymentsType } from '@skysmack/packages-terminal-payments';
import { PackageManifest } from '@skysmack/ng-ui';
import { PackageLoader } from '@skysmack/ng-packages';

export class TerminalPaymentsPackageManifest extends TerminalPaymentsType implements PackageManifest {
    public icon = 'payment';
    public menuLocation = 'main';
    public modulePath = './../packages/modules/terminal_payments_wrapper.module#TerminalPaymentsWrapperModule';
}

export function loadTerminalPaymentsPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new TerminalPaymentsPackageManifest());
}

import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { InvoicesCashPaymentsType } from '@skysmack/packages-invoices-cash-payments';
import { TenantPackageLoadStrategy } from '../start/TenantPackageLoadStrategy';
import { Route } from '@angular/router';

export class InvoicesCashPaymentsPackageManifest extends InvoicesCashPaymentsType implements PackageManifest {
    public static modulePath = './../packages/modules/invoices_cash_payments_wrapper.module#InvoicesCashPaymentsWrapperModule';
    public icon = 'attach_money';
    public menuLocation = '';
    public modulePath = InvoicesCashPaymentsPackageManifest.modulePath;
}

export function loadInvoicesCashPaymentsPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new InvoicesCashPaymentsPackageManifest());
}

export const invoicesCashPaymentsRoute = { path: TenantPackageLoadStrategy.URL_PREFIX + InvoicesCashPaymentsPackageManifest.id, loadChildren: InvoicesCashPaymentsPackageManifest.modulePath } as Route;
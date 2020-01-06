import { Injectable } from '@angular/core';
import { SummaryProvider, Summary } from '@skysmack/framework'
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { map } from 'rxjs/operators';
import { InvoicesTypeId } from '@skysmack/package-types';
import { InvoicesSummaryComponent } from './components/invoices-summary/invoices-summary.component';

@Injectable({ providedIn: 'root' })
export class NgInvoicesSummaryProvider extends SummaryProvider {
    public id = Guid.create().toString();

    constructor(private skysmackStore: NgSkysmackStore) { super(); }

    public getSummaries(): Observable<Summary[]> {
        return this.skysmackStore.getAccessiblePackages().pipe(
            map(packages => packages.filter(_package => _package.object.type === InvoicesTypeId)),
            map(invoicePackages => invoicePackages.map(invoicePackage => new Summary({
                packagePath: invoicePackage.object.path,
                component: InvoicesSummaryComponent
            })))
        );
    }
}
import { Injectable } from '@angular/core';
import { SummaryProvider, Summary } from '@skysmack/framework'
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { map } from 'rxjs/operators';
import { InvoicesPersonsTypeId } from '@skysmack/package-types';
import { InvoicesPersonsSummaryComponent } from './components/invoices-persons-summary/invoices-persons-summary.component';

@Injectable({ providedIn: 'root' })
export class NgInvoicesPersonsSummaryProvider extends SummaryProvider<number> {
    public id = Guid.create().toString();

    constructor(private skysmackStore: NgSkysmackStore) { super(); }

    public getSummaries(packagePath: string, entityId: number): Observable<Summary<number>[]> {
        return this.skysmackStore.getAccessiblePackages().pipe(
            map(packages => packages.filter(_package => _package.object.type === InvoicesPersonsTypeId)),
            map(packages => packages.filter(_package => _package.object.dependencies[1] === packagePath)),
            map(invoicePersonsPackages => invoicePersonsPackages.map(invoicePersonsPackages => new Summary<number>({
                packagePath: invoicePersonsPackages.object.path,
                component: InvoicesPersonsSummaryComponent,
                entityId
            })))
        );
    }
}
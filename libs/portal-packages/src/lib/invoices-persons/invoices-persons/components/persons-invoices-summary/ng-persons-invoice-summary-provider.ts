import { Injectable } from '@angular/core';
import { SummaryProvider, Summary } from '@skysmack/framework'
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { map } from 'rxjs/operators';
import { InvoicesPersonsTypeId } from '@skysmack/package-types';
import { PersonsInvoicesSummaryComponent } from './persons-invoices-summary.component';

/**
 * Provides a person summary shown in details about an invoice.
 */
@Injectable({ providedIn: 'root' })
export class NgPersonsInvoicesSummaryProvider extends SummaryProvider<number> {
    public id = Guid.create().toString();

    constructor(private skysmackStore: NgSkysmackStore) { super(); }

    public getSummaries(packagePath: string, entityId: number): Observable<Summary<number>[]> {
        return this.skysmackStore.getAccessiblePackages().pipe(
            map(packages => packages.filter(_package => _package.object.type === InvoicesPersonsTypeId)),
            map(packages => packages.filter(_package => _package.object.dependencies[0] === packagePath)),
            map(packages => packages.map(_package => new Summary<number>({
                packagePath: _package.object.path,
                component: PersonsInvoicesSummaryComponent,
                entityId
            })))
        );
    }
}
import { Injectable } from '@angular/core';
import { SummaryProvider, Summary } from '@skysmack/framework'
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { map } from 'rxjs/operators';
import { InvoicesLodgingReservationsTypeId } from '@skysmack/package-types';
import { LodgingReservationsInvoicesSummaryComponent } from './lodging-reservations-invoices-summary.component';

/**
 * Provides a reservation summary shown in details about an invoice.
 */
@Injectable({ providedIn: 'root' })
export class NgLodgingReservationsInvoicesSummaryProvider extends SummaryProvider<number> {
    public id = Guid.create().toString();

    constructor(private skysmackStore: NgSkysmackStore) { super(); }

    public getSummaries(packagePath: string, entityId: number): Observable<Summary<number>[]> {
        return this.skysmackStore.getAccessiblePackages().pipe(
            map(packages => packages.filter(_package => _package.object.type === InvoicesLodgingReservationsTypeId)),
            map(packages => packages.filter(_package => _package.object.dependencies[0] === packagePath)),
            map(packages => packages.map(_package => new Summary<number>({
                providerPackagePath: _package.object.path,
                component: LodgingReservationsInvoicesSummaryComponent,
                entityId
            })))
        );
    }
}
import { Injectable } from '@angular/core';
import { SummaryProvider, Summary } from '@skysmack/framework'
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { map } from 'rxjs/operators';
import { InvoicesPersonsTypeId } from '@skysmack/package-types';
import { InvoicesPersonsSummaryComponent } from './invoices-persons-summary.component';

/**
 * Provides an invoice summary shown in details about a person.
 */
@Injectable({ providedIn: 'root' })
export class NgInvoicesPersonsSummaryProvider extends SummaryProvider<number> {
    public id = Guid.create().toString();

    constructor(private skysmackStore: NgSkysmackStore) { super(); }

    public getSummaries(packagePath: string, entityId: number): Observable<Summary<number>[]> {
        return this.skysmackStore.getAccessiblePackages().pipe(
            map(packages => packages.filter(_package => _package.object.type === InvoicesPersonsTypeId)),
            map(packages => packages.filter(_package => _package.object.dependencies[1] === packagePath)),
            map(packages => packages.map(_package => new Summary<number>({
                providerPackagePath: _package.object.path,
                component: InvoicesPersonsSummaryComponent,
                entityId
            })))
        );
    }
}
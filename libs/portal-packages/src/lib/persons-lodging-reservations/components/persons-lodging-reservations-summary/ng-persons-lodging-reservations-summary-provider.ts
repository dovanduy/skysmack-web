import { Injectable } from '@angular/core';
import { SummaryProvider, Summary } from '@skysmack/framework'
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { map, tap } from 'rxjs/operators';
import { PersonsLodgingReservationsTypeId } from '@skysmack/package-types';
import { PersonsLodgingReservationsSummaryComponent } from './persons-lodging-reservations-summary.component';

/**
 * Provides a Persons summary shown in details about a reservation.
 */
@Injectable({ providedIn: 'root' })
export class NgPersonsLodgingReservationsSummaryProvider extends SummaryProvider<number> {
    public id = Guid.create().toString();

    constructor(private skysmackStore: NgSkysmackStore) { super(); }

    public getSummaries(packagePath: string, entityId: number): Observable<Summary<number>[]> {
        return this.skysmackStore.getAccessiblePackages().pipe(
            map(packages => packages.filter(_package => _package.object.type === PersonsLodgingReservationsTypeId)),
            map(packages => packages.filter(_package => _package.object.dependencies[1] === packagePath)),
            map(packages => packages.map(_packages => new Summary<number>({
                providerPackagePath: _packages.object.path,
                component: PersonsLodgingReservationsSummaryComponent,
                entityId
            })))
        );
    }
}
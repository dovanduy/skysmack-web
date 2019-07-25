import { Injectable } from '@angular/core';
import { DashboardProvider, Dashboard } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { map } from 'rxjs/operators';
import { LodgingReservationsDashboardComponent } from './lodging-reservations-dashboard/lodging-reservations-dashboard.component';
import { LodgingReservationsTypeId } from '@skysmack/package-types';

@Injectable({ providedIn: 'root' })
export class NgLodgingReservationsDashboardProvider extends DashboardProvider {
    public id = Guid.create().toString();

    constructor(private skysmackStore: NgSkysmackStore) { super(); }

    public getDashboards() {
        return this.skysmackStore.getAccessiblePackages().pipe(
            map(packages => packages.filter(_package => _package.object.type === LodgingReservationsTypeId)),
            map(packages => packages.map(_package => new Dashboard({
                packagePath: _package.object.path,
                component: LodgingReservationsDashboardComponent
            })))
        );
    }
}
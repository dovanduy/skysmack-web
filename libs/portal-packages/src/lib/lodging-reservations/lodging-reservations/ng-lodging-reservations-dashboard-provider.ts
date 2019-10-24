import { Injectable } from '@angular/core';
import { DashboardProvider, Dashboard } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { map } from 'rxjs/operators';
import { ArrivalsDashboardComponent } from './arrivals-dashboard/arrivals-dashboard.component';
import { DeparturesDashboardComponent } from './departures-dashboard/departures-dashboard.component';
import { LodgingReservationsTypeId } from '@skysmack/package-types';
import { Observable } from 'rxjs';
import { InStayDashboardComponent } from './in-stay-dashboard/in-stay-dashboard.component';

@Injectable({ providedIn: 'root' })
export class NgLodgingReservationsDashboardProvider extends DashboardProvider {
    public id = Guid.create().toString();

    constructor(private skysmackStore: NgSkysmackStore) { super(); }

    public getDashboards(): Observable<Dashboard[]> {
        return this.skysmackStore.getAccessiblePackages().pipe(
            map(packages => packages.filter(_package => _package.object.type === LodgingReservationsTypeId)),
            map(packages => {
                return packages.map(_package => {
                    return [
                        new Dashboard({
                        packagePath: _package.object.path,
                        component: ArrivalsDashboardComponent
                    }), new Dashboard({
                        packagePath: _package.object.path,
                        component: InStayDashboardComponent
                    }), new Dashboard({
                        packagePath: _package.object.path,
                        component: DeparturesDashboardComponent
                    })];
                }).reduce((a,b) => a.concat(b), []);
            })
        );
    }
}
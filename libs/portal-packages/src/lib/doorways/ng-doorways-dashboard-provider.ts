import { Injectable } from '@angular/core';
import { DashboardProvider, Dashboard } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { map } from 'rxjs/operators';
import { DoorwaysTypeId } from '@skysmack/package-types';
import { DoorwaysDashboardComponent } from './doorways/components/doorways-dashboard/doorways-dashboard.component';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NgDoorwaysDashboardProvider extends DashboardProvider {
    public id = Guid.create().toString();

    constructor(private skysmackStore: NgSkysmackStore) { super(); }

    public getDashboards(): Observable<Dashboard[]> {
        return this.skysmackStore.getAccessiblePackages().pipe(
            map(packages => packages.filter(_package => _package.object.type === DoorwaysTypeId)),
            map(packages => packages.map(_package => new Dashboard({
                packagePath: _package.object.path,
                component: DoorwaysDashboardComponent
            })))
        );
    }
}
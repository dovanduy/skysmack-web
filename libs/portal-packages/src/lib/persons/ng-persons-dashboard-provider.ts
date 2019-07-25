import { Injectable } from '@angular/core';
import { DashboardProvider, Dashboard } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { map } from 'rxjs/operators';
import { PersonsTypeId } from '@skysmack/package-types';
import { PersonsDashboardComponent } from './persons/components/persons-dashboard/persons-dashboard.component';

@Injectable({ providedIn: 'root' })
export class NgPersonsDashboardProvider extends DashboardProvider {
    public id = Guid.create().toString();

    constructor(private skysmackStore: NgSkysmackStore) { super(); }

    public getDashboards() {
        return this.skysmackStore.getPackages().pipe(
            map(packages => packages.filter(_package => _package.object.type === PersonsTypeId)),
            map(personPackages => personPackages.map(personPackage => new Dashboard({
                packagePath: personPackage.object.path,
                component: PersonsDashboardComponent
            })))
        );
    }
}
import { Injectable } from '@angular/core';
import { DashboardProvider, Dashboard } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { map } from 'rxjs/operators';
import { PassCodesTypeId } from '@skysmack/package-types';
import { PassCodesDashboardComponent } from './pass-codes/components/pass-codes-dashboard/pass-codes-dashboard.component';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NgPassCodesDashboardProvider extends DashboardProvider {
    public id = Guid.create().toString();

    constructor(private skysmackStore: NgSkysmackStore) { super(); }

    public getDashboards(): Observable<Dashboard[]> {
        return this.skysmackStore.getAccessiblePackages().pipe(
            map(packages => packages.filter(_package => _package.object.type === PassCodesTypeId)),
            map(packages => packages.map(_package => new Dashboard({
                packagePath: _package.object.path,
                component: PassCodesDashboardComponent
            })))
        );
    }
}
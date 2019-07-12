import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { LodgingReservation, LodgingReservationsAppState, LODGING_RESERVATIONS_REDUCER_KEY } from '@skysmack/packages-lodging-reservations';
import { NgRecordStore } from '@skysmack/ng-framework';
import { Observable } from 'rxjs';
import { LocalObject, DependencyOptions } from '@skysmack/framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';

@Injectable({ providedIn: 'root' })
export class NgLodgingReservationsStore extends NgRecordStore<LodgingReservationsAppState, LodgingReservation, number> {
    private deps = [
        new DependencyOptions({
            relationSelector: 'allocatedLodging',
            relationIdSelector: 'allocatedLodgingId',
            stateSelector: 'lodgings'
        }),
        new DependencyOptions({
            relationSelector: 'lodgingType',
            relationIdSelector: 'lodgingTypeId',
            stateSelector: 'lodgingTypes'
        })
    ];

    constructor(
        protected ngRedux: NgRedux<LodgingReservationsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, LODGING_RESERVATIONS_REDUCER_KEY); }

    public get(packagePath: string): Observable<LocalObject<LodgingReservation, number>[]> {
        return this.getWithDependencies(packagePath, this.deps, [0]);
    }

    public getSingle(packagePath: string, id: number): Observable<LocalObject<LodgingReservation, number>> {
        return this.getSingleWithDependency(packagePath, id, this.deps, [0]);
    }
}

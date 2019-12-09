import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { LodgingsReservationsPassCodesAppState } from './lodgings-reservations-pass-codes-reducer';
import { LODGINGS_RESERVATIONS_PASS_CODES_REDUCER_KEY } from './../constants/constants';
import { LodgingReservationPassCode, LodgingReservationPassCodeKey } from '../models/lodging-reservation-pass-code';
import { DependencyOptions, LocalObject } from '@skysmack/framework';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NgLodgingsReservationsPassCodesStore extends NgRecordStore<LodgingsReservationsPassCodesAppState, LodgingReservationPassCode, LodgingReservationPassCodeKey> {
    private deps = [
        new DependencyOptions({
            relationSelector: 'lodgingReservation',
            relationIdSelector: 'lodgingReservationId',
            stateSelector: 'lodgingReservations',
            dependencyIndexes: [0]
        }),
        new DependencyOptions({
            relationSelector: 'passCode',
            relationIdSelector: 'passCodeId',
            stateSelector: 'passCodes',
            dependencyIndexes: [1]
        })
    ];

    constructor(
        protected ngRedux: NgRedux<LodgingsReservationsPassCodesAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, LODGINGS_RESERVATIONS_PASS_CODES_REDUCER_KEY); }

    public get(packagePath: string): Observable<LocalObject<LodgingReservationPassCode, LodgingReservationPassCodeKey>[]> {
        return this.getWithDependencies(packagePath, this.deps);
    }

    public getSingle(packagePath: string, id: LodgingReservationPassCodeKey): Observable<LocalObject<LodgingReservationPassCode, LodgingReservationPassCodeKey>> {
        return this.getSingleWithDependency(packagePath, id, this.deps);
    }
}

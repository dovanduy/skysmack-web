import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { DoorwaysPassCodesAppState } from './doorways-pass-codes-reducer';
import { DoorwayPassCode, DoorwayPassCodeKey } from './../models/doorway-pass-code';
import { DOORWAYS_PASS_CODES_REDUCER_KEY } from './../constants/constants';
import { LocalObject, hasValue } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgDoorwaysPassCodesStore extends NgRecordStore<DoorwaysPassCodesAppState, DoorwayPassCode, DoorwayPassCodeKey> {
    constructor(
        protected ngRedux: NgRedux<DoorwaysPassCodesAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, DOORWAYS_PASS_CODES_REDUCER_KEY); }

    protected getSingleRecord(packagePath: string, id: DoorwayPassCodeKey): Observable<LocalObject<DoorwayPassCode, DoorwayPassCodeKey>> {
        return this.get(packagePath).pipe(
            map(records => records.find(record => {
                const firstIdMatch = record.object.id.doorwayId === id.doorwayId;
                const secondIdMatch = record.object.id.passCodeId === id.passCodeId;
                return (firstIdMatch && secondIdMatch) ? true : false;
            })),
            hasValue()
        );
    }
}

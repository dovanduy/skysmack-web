import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { LodgingReservation, LodgingReservationsAppState } from '@skysmack/packages-lodging-reservations';
import { NgRecordReduxStore } from '@skysmack/ng-redux';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NgLodgingReservationsStore extends NgRecordReduxStore<LodgingReservationsAppState, LodgingReservation, number> {
    constructor(protected ngRedux: NgRedux<LodgingReservationsAppState>) { super(ngRedux, 'lodging-reservations'); }

    public requestAvailableLodgings(path: string, start: string, end: string) {
        // this.store.dispatch(this.actions.getAvailableLodgings(path, start, end));
    }

    public getAvailableLodgings(path: string): Observable<any> {
        return of('implement this');
        // return this.store.select((state: IAppState) => this.getReduxArea<LodgingsReservationsFeatureState>(state).availableLodgings).pipe(extractIfDictionary(path), defined(), hasValue());
    }
}

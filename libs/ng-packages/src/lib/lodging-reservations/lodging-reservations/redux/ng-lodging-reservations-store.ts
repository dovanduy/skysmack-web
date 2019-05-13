import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { LodgingReservation, LodgingReservationsAppState } from '@skysmack/packages-lodging-reservations';
import { NgRecordStore, getPackageDendencyAsStream } from '@skysmack/ng-redux';
import { Observable, combineLatest } from 'rxjs';
import { LocalObject } from '@skysmack/framework';
import { map, switchMap } from 'rxjs/operators';
import { NgSkysmackStore } from '@skysmack/ng-core';


@Injectable({ providedIn: 'root' })
export class NgLodgingReservationsStore extends NgRecordStore<LodgingReservationsAppState, LodgingReservation, number> {
    constructor(
        protected ngRedux: NgRedux<LodgingReservationsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, 'lodgingReservations'); }

    public get(packagePath: string): Observable<LocalObject<LodgingReservation, number>[]> {
        return getPackageDendencyAsStream(this.skysmackStore, packagePath, [0]).pipe(
            switchMap(targetPackage => combineLatest(
                this.getRecords(packagePath),
                this.getDependencies(targetPackage.object.path, 'lodgings'),
                this.getDependencies(targetPackage.object.path, 'lodgingTypes')
            ).pipe(
                map(([records, lodgings, lodgingTypes]) => {
                    this.mapRecordsDependencies(records, lodgings, 'allocatedLodgingId', 'allocatedLodging');
                    this.mapRecordsDependencies(records, lodgingTypes, 'lodgingTypeId', 'lodgingType');
                    return records;
                })
            ))
        );
    }

    public getSingle(packagePath: string, id: number): Observable<LocalObject<LodgingReservation, number>> {
        return getPackageDendencyAsStream(this.skysmackStore, packagePath, [0]).pipe(
            switchMap(targetPackage => combineLatest(
                this.getSingleRecord(packagePath, id),
                this.getDependencies(targetPackage.object.path, 'lodgings'),
                this.getDependencies(targetPackage.object.path, 'lodgingTypes')
            ).pipe(
                map(([record, lodgings, lodgingTypes]) => {
                    this.mapRecordDependency(record, lodgings, 'allocatedLodgingId', 'allocatedLodging');
                    this.mapRecordDependency(record, lodgingTypes, 'lodgingTypeId', 'lodgingType');
                    return record;
                })
            ))
        );
    }


}

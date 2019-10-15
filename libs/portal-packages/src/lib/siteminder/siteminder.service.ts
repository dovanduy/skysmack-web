import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Channel } from '@skysmack/packages-siteminder';
import { LocalObject } from '@skysmack/framework';
import { TopColumnType } from './siteminder-mock-data';

@Injectable({ providedIn: 'root' })
export class SiteMinderService {
    //#region Filters
    /**
     * What data should be shown in the top colum
     * (and reversedly in the expandable column)
     */
    private topColumnType$ = new BehaviorSubject<TopColumnType>(TopColumnType.RatePlans);
    /**
     * Whether to show rate columns
     */
    private ratesChecked$ = new BehaviorSubject(true);
    /**
     * Whether to show restriction columns
     */
    private restrictionsChecked$ = new BehaviorSubject(true);
    /**
     * Whether to show the availability column
     */
    private availabilityChecked$ = new BehaviorSubject(true);
    /**
     * What room types have been selected.
     * One top column is created pr. room type.
     */
    private roomTypeIdsSelected$ = new BehaviorSubject<number[]>([]);
    /**
     * What rate plans to show foreach lodging type.
     */
    private ratePlanIdsSelected$ = new BehaviorSubject<number[]>([]);
    /**
     * What channels to show foreach lodging type.
     */
    private channelIdsSelected$ = new BehaviorSubject<number[]>([]);
    //#endregion

    constructor(
    ) {
    }

    //#region Getters and Setters
    // TopColumnType
    public getTopColumnType(): Observable<TopColumnType> {
        return this.topColumnType$;
    }
    public setTopColumnType(value: TopColumnType): void {
        this.topColumnType$.next(value);
    }

    // RatesChecked
    public getRatesChecked(): Observable<boolean> {
        return this.ratesChecked$;
    }
    public setRatesChecked(value: boolean): void {
        this.ratesChecked$.next(value);
    }

    // RestrictionsChecked
    public getRestrictionsChecked(): Observable<boolean> {
        return this.restrictionsChecked$;
    }
    public setRestrictionsChecked(value: boolean): void {
        this.restrictionsChecked$.next(value);
    }

    // AvailabilityChecked
    public getAvailabilityChecked(): Observable<boolean> {
        return this.availabilityChecked$;
    }
    public setAvailabilityChecked(value: boolean): void {
        this.availabilityChecked$.next(value);
    }

    // RoomTypeIdsSelected
    public getRoomTypeIdsSelected(): Observable<number[]> {
        return this.roomTypeIdsSelected$;
    }
    public setRoomTypeIdsSelected(value: number[]): void {
        this.roomTypeIdsSelected$.next(value);
    }

    // RatePlanIdsSelected
    public getRatePlanIdsSelected(): Observable<number[]> {
        return this.ratePlanIdsSelected$;
    }
    public setRatePlanIdsSelected(value: number[]): void {
        this.ratePlanIdsSelected$.next(value);
    }

    // ChannelIdsSelected
    public getChannelIdsSelected(): Observable<number[]> {
        return this.channelIdsSelected$;
    }
    public setChannelIdsSelected(value: number[]): void {
        this.channelIdsSelected$.next(value);
    }
    //#endregion
}
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { toLocalObject, StrIndex, PagedQuery, LocalObject } from '@skysmack/framework';
import { LodgingType } from '@skysmack/packages-lodgings';
import { RatePlan, Channel, LodgingTypeRate, LodgingTypeAvailability, LodgingTypeRateKey } from '@skysmack/packages-siteminder';
import { SiteMinderColumn } from '../models/siteminder-column';
import { RateSummary } from '../models/rate-summary';
import { RateInfo } from '../models/rate-info';
import { NgLodgingTypesStore, NgLodgingTypesActions } from '@skysmack/ng-lodgings';
import { NgSiteMinderRatePlansStore, NgSiteMinderRatePlansActions, NgSiteMinderChannelsStore, NgSiteMinderChannelsActions, NgSiteMinderChannelManagerStore, NgSiteMinderChannelManagerActions } from '@skysmack/ng-siteminder';
import { getPackageDendencyAsStream } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { tap, map, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SiteMinderService {
    // Columns
    public dateColumn$ = new BehaviorSubject<SiteMinderColumn>(null);
    public lodgingTypeColumns$ = new BehaviorSubject<SiteMinderColumn[]>(null);
    public availabilityColumns$ = new BehaviorSubject<StrIndex<SiteMinderColumn>>(null);
    public ratePlanColumns$ = new BehaviorSubject<StrIndex<SiteMinderColumn[]>>(null);
    public rateSummaryColumns$ = new BehaviorSubject<StrIndex<SiteMinderColumn>>(null);
    public channelsColumns$ = new BehaviorSubject<StrIndex<SiteMinderColumn[]>>(null);

    // Rows
    public dateRows$ = new BehaviorSubject<Date[]>(null);

    // Cells
    public availabilityCells$ = new BehaviorSubject<StrIndex<StrIndex<LodgingTypeAvailability>>>(null);
    public rateSummaryCells$ = new BehaviorSubject<StrIndex<StrIndex<StrIndex<RateSummary>>>>(null);
    public channelsCells$ = new BehaviorSubject<StrIndex<StrIndex<StrIndex<StrIndex<RateInfo>>>>>(null);

    constructor(
        private skysmackStore: NgSkysmackStore,
        private lodgingTypesStore: NgLodgingTypesStore,
        private lodgingTypesActions: NgLodgingTypesActions,
        private ratePlansStore: NgSiteMinderRatePlansStore,
        private ratePlansActions: NgSiteMinderRatePlansActions,
        private channelsStore: NgSiteMinderChannelsStore,
        private channelsActions: NgSiteMinderChannelsActions,
        private channelManagerStore: NgSiteMinderChannelManagerStore,
        private channelManagerActions: NgSiteMinderChannelManagerActions
    ) {
        // this.seedMockedCells();
    }

    public generateColumns(packagePath: string): Observable<unknown> {
        // ########
        // Data prep
        // ########
        // Lodging Types
        const lodgingTypes$ = this.getLodgingTypesStream(packagePath);

        // RatePlans
        this.ratePlansActions.getPaged(packagePath, new PagedQuery());
        const ratePlans$ = this.ratePlansStore.get(packagePath).pipe(
            distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
        );

        // Channels
        this.channelsActions.getPaged(packagePath, new PagedQuery());
        const channels$ = this.channelsStore.get(packagePath).pipe(
            distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
        );

        // ########
        // Column processing
        // ########
        // Columns
        const columns$ = [];
        const availabilityColumns: StrIndex<SiteMinderColumn> = {};
        const ratePlanColumns: StrIndex<SiteMinderColumn[]> = {};
        const rateSummaryColumns: StrIndex<SiteMinderColumn> = {};
        const channelsColumns: StrIndex<SiteMinderColumn[]> = {};

        // Date column
        this.dateColumn$.next(new SiteMinderColumn({ title: 'Date' }));

        // LodgingType columns
        columns$.push(lodgingTypes$.pipe(
            map(lodgingTypes => lodgingTypes.map(lodgingType => new SiteMinderColumn({
                id: lodgingType.object.id,
                title: lodgingType.object.name
            }))),
            tap(columns => this.lodgingTypeColumns$.next(columns))
        ));

        columns$.push(combineLatest(
            this.lodgingTypeColumns$,
            ratePlans$
        ).pipe(
            map(([lodgingTypeColumns, ratePlans]) => lodgingTypeColumns.forEach(ltc => {
                // Availability columns
                availabilityColumns[ltc.id] = new SiteMinderColumn({
                    id: ltc.id,
                    title: 'Available'
                });
                this.availabilityColumns$.next(availabilityColumns)

                // RatePlan columns
                ratePlanColumns[ltc.id] = ratePlans.map(ratePlan => new SiteMinderColumn({
                    id: ratePlan.object.id,
                    title: ratePlan.object.name
                }));
                this.ratePlanColumns$.next(ratePlanColumns);
            }))
        ));

        columns$.push(combineLatest(
            this.ratePlanColumns$,
            channels$
        ).pipe(
            map(([ratePlanColumns, channels]) => Object.keys(ratePlanColumns).forEach(key => ratePlanColumns[key].forEach(rpc => {
                // RateSummary columns
                rateSummaryColumns[rpc.id] = new SiteMinderColumn({ id: rpc.id, title: 'Rates (all)' });
                this.rateSummaryColumns$.next(rateSummaryColumns);

                // Channel columns
                channelsColumns[rpc.id] = channels.map(channel => new SiteMinderColumn({ id: channel.object.id, title: channel.object.name }));
                this.channelsColumns$.next(channelsColumns);
            })))
        ));

        return combineLatest(columns$);
    }

    public generateCells(packagePath: string, start: Date, end: Date): Observable<unknown> {
        // ########
        // Data prep
        // ########
        // Date rows
        end = this.addDays(start, 2); // Temp!
        const dateRows = this.getDateRows(start, end);

        // LodgingTypes
        const lodgingTypes$ = this.getLodgingTypesStream(packagePath);

        // Availability
        this.channelManagerActions.getAvailability(packagePath, start, end);
        const availability$ = this.channelManagerStore.getAvailability(packagePath, start, end).pipe(
            distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
            // TEMP! REMOVE WHEN GET_AVAILABILITY RETURNS ACTUAL DATA
            map(() => dateRows.map(date => [
                new LodgingTypeAvailability({
                    lodgingTypeId: 1,
                    date,
                    available: 6,
                    availableModifier: -1
                }),
                new LodgingTypeAvailability({
                    lodgingTypeId: 2,
                    date,
                    available: 5,
                    availableModifier: 2
                }),
                new LodgingTypeAvailability({
                    lodgingTypeId: 3,
                    date,
                    available: 3,
                    availableModifier: 0
                }),
                new LodgingTypeAvailability({
                    lodgingTypeId: 4,
                    date,
                    available: 9,
                    availableModifier: 4
                }),
            ]).reduce((a, b) => a.concat(b), []))
            // TEMP! END
        );

        // Channels
        const channels$ = this.channelsStore.get(packagePath).pipe(
            distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
        );

        // Rates
        this.channelManagerActions.getRates(packagePath, start, end);
        const rates$ = this.channelManagerStore.getRates(packagePath, start, end).pipe(
            distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
            // TEMP! REMOVE WHEN GET_RATES RETURNS ACTUAL DATA
            map(() => dateRows.map(date => [
                // LT1 - RP1
                new LodgingTypeRate({
                    lodgingTypeId: 1,
                    ratePlanId: 1,
                    date,
                    rate: 599,
                    channelId: 1
                }),
                new LodgingTypeRate({
                    lodgingTypeId: 1,
                    ratePlanId: 1,
                    date,
                    rate: 399,
                    channelId: 2
                }),
                new LodgingTypeRate({
                    lodgingTypeId: 1,
                    ratePlanId: 1,
                    date,
                    rate: 449,
                    channelId: 3
                }),
                // LT1 - RP2
                new LodgingTypeRate({
                    lodgingTypeId: 1,
                    ratePlanId: 2,
                    date,
                    rate: 299,
                    channelId: 1
                }),
                new LodgingTypeRate({
                    lodgingTypeId: 1,
                    ratePlanId: 2,
                    date,
                    rate: 199,
                    channelId: 2
                }),
                new LodgingTypeRate({
                    lodgingTypeId: 1,
                    ratePlanId: 2,
                    date,
                    rate: 349,
                    channelId: 3
                }),
                // LT2 - RP1
                new LodgingTypeRate({
                    lodgingTypeId: 2,
                    ratePlanId: 1,
                    date,
                    rate: 549,
                    channelId: 1
                }),
                new LodgingTypeRate({
                    lodgingTypeId: 2,
                    ratePlanId: 1,
                    date,
                    rate: 3399,
                    channelId: 2
                }),
                new LodgingTypeRate({
                    lodgingTypeId: 2,
                    ratePlanId: 1,
                    date,
                    rate: 1449,
                    channelId: 3
                }),



                // LT2 - RP2
                new LodgingTypeRate({
                    lodgingTypeId: 2,
                    ratePlanId: 2,
                    date,
                    rate: 99,
                    channelId: 1
                }),
                new LodgingTypeRate({
                    lodgingTypeId: 2,
                    ratePlanId: 2,
                    date,
                    rate: 99,
                    channelId: 2
                }),
                new LodgingTypeRate({
                    lodgingTypeId: 2,
                    ratePlanId: 2,
                    date,
                    rate: 49,
                    channelId: 3
                }),
                // LT3 - RP1
                new LodgingTypeRate({
                    lodgingTypeId: 3,
                    ratePlanId: 1,
                    date,
                    rate: 599,
                    channelId: 1
                }),
                new LodgingTypeRate({
                    lodgingTypeId: 3,
                    ratePlanId: 1,
                    date,
                    rate: 399,
                    channelId: 2
                }),
                new LodgingTypeRate({
                    lodgingTypeId: 3,
                    ratePlanId: 1,
                    date,
                    rate: 449,
                    channelId: 3
                }),
                // LT3 - RP2
                new LodgingTypeRate({
                    lodgingTypeId: 3,
                    ratePlanId: 2,
                    date,
                    rate: 599,
                    channelId: 1
                }),
                new LodgingTypeRate({
                    lodgingTypeId: 3,
                    ratePlanId: 2,
                    date,
                    rate: 399,
                    channelId: 2
                }),
                new LodgingTypeRate({
                    lodgingTypeId: 3,
                    ratePlanId: 2,
                    date,
                    rate: 449,
                    channelId: 3
                }),
                // LT4 - RP1
                new LodgingTypeRate({
                    lodgingTypeId: 4,
                    ratePlanId: 1,
                    date,
                    rate: 59,
                    channelId: 1
                }),
                new LodgingTypeRate({
                    lodgingTypeId: 4,
                    ratePlanId: 1,
                    date,
                    rate: 39,
                    channelId: 2
                }),
                new LodgingTypeRate({
                    lodgingTypeId: 4,
                    ratePlanId: 1,
                    date,
                    rate: 44,
                    channelId: 3
                }),
                // LT4 - RP2
                new LodgingTypeRate({
                    lodgingTypeId: 4,
                    ratePlanId: 2,
                    date,
                    rate: 359,
                    channelId: 1
                }),
                new LodgingTypeRate({
                    lodgingTypeId: 4,
                    ratePlanId: 2,
                    date,
                    rate: 339,
                    channelId: 2
                }),
                new LodgingTypeRate({
                    lodgingTypeId: 4,
                    ratePlanId: 2,
                    date,
                    rate: 344,
                    channelId: 3
                }),
            ]).reduce((a, b) => a.concat(b), []).map(x => toLocalObject<LodgingTypeRate, LodgingTypeRateKey>(x))),
            // TEMP! END,
        );

        // ########
        // Cells processing
        // ########
        // Cells
        const cells$ = [];
        const availabilityCells: StrIndex<StrIndex<LodgingTypeAvailability>> = {};
        const rateSummaryCells: StrIndex<StrIndex<StrIndex<RateSummary>>> = {};
        const channelsCells: StrIndex<StrIndex<StrIndex<StrIndex<RateInfo>>>> = {};

        // Date rows
        this.dateRows$.next(dateRows);

        // Availability cells
        cells$.push(combineLatest([
            // Note: The weird combineLatest setup is used because types gets weird,
            // when more than 6 streams are used in one combineLatest (at the time of writing).
            combineLatest([
                this.dateRows$,
                this.lodgingTypeColumns$,
                this.ratePlanColumns$,
                this.channelsColumns$,
            ]),
            combineLatest([
                availability$,
                channels$,
                rates$,
                lodgingTypes$,
            ])
        ]).pipe(
            map(([[dateRows, lodgingTypeColumns, ratePlanColumns, channelColumns], [availability, channels, rates, lodgingTypes]]) => {
                // Foreach date row
                dateRows.forEach(date => {
                    const dateIndex = date.toString();
                    const currentDateRates = rates.filter(rate => rate.object.date === date);

                    lodgingTypeColumns.forEach(ltc => {
                        // Availability Cells
                        availabilityCells[dateIndex] ? availabilityCells[dateIndex] : availabilityCells[dateIndex] = {};
                        const avail = availability.find(avail => avail.lodgingTypeId === ltc.id);
                        avail.lodgingType = lodgingTypes.find(lodgingType => avail.lodgingTypeId === lodgingType.object.id);
                        availabilityCells[dateIndex][ltc.id] = avail;
                        this.availabilityCells$.next(availabilityCells);
                    });

                    Object.keys(ratePlanColumns).forEach(lodgingTypeId => {
                        const lodgingTypeRates = currentDateRates.filter(rate => Number(rate.object.lodgingTypeId) === Number(lodgingTypeId));

                        ratePlanColumns[lodgingTypeId].forEach(rpc => {
                            const currentRatePlanChannelColumns = channelColumns[rpc.id];
                            const lodgingType = lodgingTypes.find(lodgingType => Number(lodgingType.object.id) === Number(lodgingTypeId));
                            const ratePlanRates = lodgingTypeRates.filter(rate => Number(rate.object.ratePlanId) === Number(rpc.id));

                            // RateSummary cells
                            rateSummaryCells[dateIndex] ? rateSummaryCells[dateIndex] : rateSummaryCells[dateIndex] = {};
                            rateSummaryCells[dateIndex][rpc.id] ? rateSummaryCells[dateIndex][rpc.id] : rateSummaryCells[dateIndex][rpc.id] = {};

                            rateSummaryCells[dateIndex][rpc.id][lodgingTypeId] = new RateSummary({
                                date: date,
                                ratePlanTitle: rpc.title,
                                rates: ratePlanRates,
                                channels: channels.map(x => x.object),
                                lodgingType: lodgingType ? lodgingType : null
                            });
                            this.rateSummaryCells$.next(rateSummaryCells);

                            // Channel cells
                            channelsCells[dateIndex] ? channelsCells[dateIndex] : channelsCells[dateIndex] = {};
                            channelsCells[dateIndex][rpc.id] ? channelsCells[dateIndex][rpc.id] : channelsCells[dateIndex][rpc.id] = {};
                            channelsCells[dateIndex][rpc.id][lodgingTypeId] ? channelsCells[dateIndex][rpc.id][lodgingTypeId] : channelsCells[dateIndex][rpc.id][lodgingTypeId] = {};

                            const channelRatesDictionary = channelsCells[dateIndex][rpc.id][lodgingTypeId];
                            currentRatePlanChannelColumns.forEach(cc => {
                                const channel = channels.find(channel => channel.object.id === cc.id);
                                channelRatesDictionary[cc.id] = new RateInfo({
                                    date: date,
                                    rate: ratePlanRates.find(rate => Number(rate.object.channelId) === Number(cc.id)),
                                    ratePlanTitle: rpc.title,
                                    channel: channel ? channel : null,
                                    lodgingType: lodgingType ? lodgingType : null
                                });
                            });
                            this.channelsCells$.next(channelsCells);
                        });
                    });
                });
            })
        ));

        return combineLatest(cells$);
    }

    private getLodgingTypesStream(packagePath: string): Observable<LocalObject<LodgingType, number>[]> {
        const lodgingPackage$ = getPackageDendencyAsStream(this.skysmackStore, packagePath, [0, 1, 0]);
        const lodgingPath$ = lodgingPackage$.pipe(
            map(_package => _package.object.path),
            distinctUntilChanged()
        );

        return lodgingPath$.pipe(
            switchMap(path => {
                this.lodgingTypesActions.getPaged(path, new PagedQuery());
                return this.lodgingTypesStore.get(path).pipe(
                    distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
                );
            })
        );
    }

    private getDateRows(start: Date, end: Date): Date[] {
        const arr = []
        const date = start;
        for (; start <= end; date.setDate(date.getDate() + 1)) {
            arr.push(new Date(date));
        }
        return arr;
    };

    // TEMP: Used w. mock data
    private addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
}
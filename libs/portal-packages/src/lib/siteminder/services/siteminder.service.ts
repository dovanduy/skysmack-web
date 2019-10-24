import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { toLocalObject, StrIndex, PagedQuery, LocalObject } from '@skysmack/framework';
import { LodgingType } from '@skysmack/packages-lodgings';
import { RatePlan, Channel, Availability, LodgingTypeRate, LodgingTypeAvailability } from '@skysmack/packages-siteminder';
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

    // Data
    private data = {
        lodgingTypes: [
            toLocalObject<LodgingType, number>(new LodgingType({
                id: 1,
                name: 'Single room'
            })),
            toLocalObject<LodgingType, number>(new LodgingType({
                id: 2,
                name: 'Double room'
            })),
            // toLocalObject<LodgingType, number>(new LodgingType({
            //     id: 3,
            //     name: 'Presidents Suite'
            // }))
        ],
        ratePlans: [
            toLocalObject<RatePlan, number>(new RatePlan({
                id: 1,
                name: 'RatePlan A (With breakfeast)'
            })),
            toLocalObject<RatePlan, number>(new RatePlan({
                id: 2,
                name: 'RatePlan B (No Breakfeast)'
            }))
        ],
        channels: [
            toLocalObject<Channel, number>(new Channel({
                id: 1,
                name: 'Expedia'
            })),
            toLocalObject<Channel, number>(new Channel({
                id: 2,
                name: 'BookingManager'
            })),
            toLocalObject<Channel, number>(new Channel({
                id: 3,
                name: 'Let\'s Stay'
            }))
        ]
    };

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

        // RatePlans
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
            // TEMP! REMOVE WHEN GET AVAILABILITY RETURNS ACTUAL DATA
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
            this.dateRows$,
            this.lodgingTypeColumns$,
            availability$,
            lodgingTypes$,
        ]).pipe(
            map(([dateRows, lodgingTypeColumns, availability, lodgingTypes]) => {
                dateRows.forEach(date => {
                    const dateIndex = date.toString();
                    // const todayRates = rates.filter(rate => rate.date === date);

                    lodgingTypeColumns.forEach(ltc => {
                        // Availability Cells
                        availabilityCells[dateIndex] ? availabilityCells[dateIndex] : availabilityCells[dateIndex] = {};
                        const avail = availability.find(avail => avail.lodgingTypeId === ltc.id);
                        avail.lodgingType = lodgingTypes.find(lodgingType => avail.lodgingTypeId === lodgingType.object.id);
                        availabilityCells[dateIndex][ltc.id] = avail;
                        this.availabilityCells$.next(availabilityCells);
                    });
                });
            })
        ));

        return combineLatest(cells$);
    }

    private seedMockedColumns(): void {
        // Data
        const { lodgingTypes, ratePlans, channels } = this.data;

        // Columns
        const dateColumn = new SiteMinderColumn({ title: 'Date' });
        let lodgingTypeColumns: SiteMinderColumn[] = [];
        const availabilityColumns: StrIndex<SiteMinderColumn> = {};
        const ratePlanColumns: StrIndex<SiteMinderColumn[]> = {};
        const rateSummaryColumns: StrIndex<SiteMinderColumn> = {};
        const channelsColumns: StrIndex<SiteMinderColumn[]> = {};

        // Processing

        // Lodging Types
        lodgingTypeColumns = lodgingTypes.map(lodgingType => new SiteMinderColumn({
            id: lodgingType.object.id,
            title: lodgingType.object.name
        }));

        lodgingTypeColumns.forEach(ltc => {
            // Availability
            availabilityColumns[ltc.id] = new SiteMinderColumn({
                id: ltc.id,
                title: 'Available'
            });

            // Rate Plans
            ratePlanColumns[ltc.id] = ratePlans.map(ratePlan => new SiteMinderColumn({
                id: ratePlan.object.id,
                title: ratePlan.object.name
            }));
        });

        Object.keys(ratePlanColumns).forEach(key => ratePlanColumns[key].forEach(rpc => {
            rateSummaryColumns[rpc.id] = new SiteMinderColumn({ id: rpc.id, title: 'Rates (all)' })
            channelsColumns[rpc.id] = channels.map(channel => new SiteMinderColumn({ id: channel.object.id, title: channel.object.name }))
        }));

        // Update streams
        this.dateColumn$.next(dateColumn);
        this.lodgingTypeColumns$.next(lodgingTypeColumns);
        this.availabilityColumns$.next(availabilityColumns);
        this.ratePlanColumns$.next(ratePlanColumns);
        this.rateSummaryColumns$.next(rateSummaryColumns);
        this.channelsColumns$.next(channelsColumns);
    }

    private seedMockedCells(): void {
        // Data
        const dateRows = [new Date(), this.addDays(new Date(), 1), this.addDays(new Date(), 2)];
        const rates = this.getRates(dateRows);
        const { channels, lodgingTypes } = this.data;

        // Cells
        const availabilityCells: StrIndex<StrIndex<LodgingTypeAvailability>> = {};
        const rateSummaryCells: StrIndex<StrIndex<StrIndex<RateSummary>>> = {};
        const channelsCells: StrIndex<StrIndex<StrIndex<StrIndex<RateInfo>>>> = {};

        // Columns
        const lodgingTypeColumns = this.lodgingTypeColumns$.getValue();
        const ratePlanColumns = this.ratePlanColumns$.getValue();
        const channelColumns = this.channelsColumns$.getValue();

        // Processing
        dateRows.forEach(date => {
            const dateIndex = date.toString();
            const todayRates = rates.filter(rate => rate.date === date);

            lodgingTypeColumns.forEach(ltc => {
                // Availability Cells
                const lodgingType = lodgingTypes.find(lodgingType => lodgingType.object.id === ltc.id)
                availabilityCells[dateIndex] ? availabilityCells[dateIndex] : availabilityCells[dateIndex] = {};
                availabilityCells[dateIndex][ltc.id] = new LodgingTypeAvailability({
                    available: 7,
                    availableModifier: -1,
                    lodgingTypeId: ltc.id,
                    lodgingType: lodgingType ? lodgingType : null
                })
            });

            Object.keys(ratePlanColumns).forEach(lodgingTypeId => ratePlanColumns[lodgingTypeId].forEach(rpc => {
                const currentRatePlanChannelColumns = channelColumns[rpc.id];
                const lodgingType = lodgingTypes.find(lodgingType => lodgingType.object.id === Number(lodgingTypeId));

                // RateSummary cells
                rateSummaryCells[dateIndex] ? rateSummaryCells[dateIndex] : rateSummaryCells[dateIndex] = {};
                rateSummaryCells[dateIndex][rpc.id] ? rateSummaryCells[dateIndex][rpc.id] : rateSummaryCells[dateIndex][rpc.id] = {};

                rateSummaryCells[dateIndex][rpc.id][lodgingTypeId] = new RateSummary({
                    date: date,
                    ratePlanTitle: rpc.title,
                    rates: todayRates,
                    channels: channels.map(x => x.object),
                    lodgingType: lodgingType ? lodgingType.object : null
                });

                // Channel cells
                channelsCells[dateIndex] ? channelsCells[dateIndex] : channelsCells[dateIndex] = {};
                channelsCells[dateIndex][rpc.id] ? channelsCells[dateIndex][rpc.id] : channelsCells[dateIndex][rpc.id] = {};
                channelsCells[dateIndex][rpc.id][lodgingTypeId] ? channelsCells[dateIndex][rpc.id][lodgingTypeId] : channelsCells[dateIndex][rpc.id][lodgingTypeId] = {};

                const channelRatesDictionary = channelsCells[dateIndex][rpc.id][lodgingTypeId];
                currentRatePlanChannelColumns.forEach(cc => {
                    const channel = channels.find(channel => channel.object.id === cc.id);
                    channelRatesDictionary[cc.id] = new RateInfo({
                        date: date,
                        rate: todayRates.find(rate => rate.channelId === cc.id),
                        ratePlanTitle: rpc.title,
                        channel: channel ? channel.object : null,
                        lodgingType: lodgingType ? lodgingType.object : null
                    });
                });
            }))
        });

        // Update streams
        this.dateRows$.next(dateRows);
        this.availabilityCells$.next(availabilityCells);
        this.rateSummaryCells$.next(rateSummaryCells);
        this.channelsCells$.next(channelsCells);
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

    // TEMP: Used w. mock data
    private getRates(dateRows): LodgingTypeRate[] {
        return dateRows.map((date, index) => {
            if (index === 0) {
                return [
                    new LodgingTypeRate({ rate: 599, channelId: 1, date }),
                    new LodgingTypeRate({ rate: 299, channelId: 2, date }),
                    new LodgingTypeRate({ rate: 500, channelId: 3, date }),
                ];
            }

            if (index === 1) {
                return [
                    new LodgingTypeRate({ rate: 399, channelId: 1, date }),
                    new LodgingTypeRate({ rate: 999, channelId: 2, date }),
                    new LodgingTypeRate({ rate: 600, channelId: 3, date }),
                ];
            }

            if (index === 2) {
                return [
                    new LodgingTypeRate({ rate: 799, channelId: 1, date }),
                    new LodgingTypeRate({ rate: 399, channelId: 2, date }),
                    new LodgingTypeRate({ rate: 700, channelId: 3, date })
                ];
            }

        }).reduce((a, b) => a.concat(b), []);
    }
}
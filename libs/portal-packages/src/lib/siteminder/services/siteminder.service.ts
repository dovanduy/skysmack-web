import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { toLocalObject, StrIndex } from '@skysmack/framework';
import { LodgingType } from '@skysmack/packages-lodgings';
import { RatePlan, Channel, Availability, Rate, LodgingTypeRate } from '@skysmack/packages-siteminder';
import { SiteMinderColumn } from '../models/siteminder-column';
import { RateSummary } from '../models/rate-summary';

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
    public availabilityCells$ = new BehaviorSubject<StrIndex<StrIndex<Availability>>>(null);
    public rateSummaryCells$ = new BehaviorSubject<StrIndex<StrIndex<RateSummary>>>(null);
    public channelsCells$ = new BehaviorSubject<StrIndex<StrIndex<StrIndex<LodgingTypeRate>>>>(null);

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
    ) {
        this.seedColumns();
        this.seedCells();
    }

    private seedColumns(): void {
        // Data
        const { lodgingTypes, ratePlans, channels } = this.data;

        // Columns
        const dateColumn = new SiteMinderColumn({ title: 'Date' });
        const lodgingTypeColumns: SiteMinderColumn[] = lodgingTypes.map(lodgingType => new SiteMinderColumn({
            id: lodgingType.object.id,
            title: lodgingType.object.name
        }));
        const availabilityColumns: StrIndex<SiteMinderColumn> = {};
        const ratePlanColumns: StrIndex<SiteMinderColumn[]> = {};
        const rateSummaryColumns: StrIndex<SiteMinderColumn> = {};
        const channelsColumns: StrIndex<SiteMinderColumn[]> = {};

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

    private seedCells(): void {
        // Data
        const dateRows = [new Date(), this.addDays(new Date(), 1), this.addDays(new Date(), 2)];
        const rates = this.getRates(dateRows);
        const { channels } = this.data;

        // Cells
        const availabilityCells: StrIndex<StrIndex<Availability>> = {};
        const rateSummaryCells: StrIndex<StrIndex<RateSummary>> = {};
        const channelsCells: StrIndex<StrIndex<StrIndex<LodgingTypeRate>>> = {};

        const lodgingTypeColumns = this.lodgingTypeColumns$.getValue();
        const ratePlanColumns = this.ratePlanColumns$.getValue();
        const channelColumns = this.channelsColumns$.getValue();

        dateRows.forEach(date => lodgingTypeColumns.forEach(ltc => {
            const dateIndex = date.toString();
            availabilityCells[dateIndex] ? availabilityCells[dateIndex] : availabilityCells[dateIndex] = {};
            availabilityCells[dateIndex][ltc.id] = new Availability({
                available: 7,
                availableModifier: -1,
                lodgingTypeId: 1
            });
        }));

        dateRows.forEach(date => {
            const todayRates = rates.filter(rate => rate.date === date);
            const dateIndex = date.toString();

            Object.keys(ratePlanColumns).forEach(key => ratePlanColumns[key].forEach(rpc => {
                const currentRatePlanChannelColumns = channelColumns[rpc.id];

                // RateSummary cells
                rateSummaryCells[dateIndex] ? rateSummaryCells[dateIndex] : rateSummaryCells[dateIndex] = {};
                rateSummaryCells[dateIndex][rpc.id] = new RateSummary({
                    date: date,
                    rates: todayRates,
                    channels: channels.map(x => x.object)
                });

                // Channel cells
                channelsCells[dateIndex] ? channelsCells[dateIndex] : channelsCells[dateIndex] = {};
                channelsCells[dateIndex][rpc.id] ? channelsCells[dateIndex][rpc.id] : channelsCells[dateIndex][rpc.id] = {};
                const channelRatesDictionary = channelsCells[dateIndex][rpc.id];
                currentRatePlanChannelColumns.forEach(cc => {
                    channelRatesDictionary[cc.id] = todayRates.find(rate => rate.channelId === cc.id);
                });
            }))
        });

        // Update streams
        this.dateRows$.next(dateRows);
        this.availabilityCells$.next(availabilityCells);
        this.rateSummaryCells$.next(rateSummaryCells);
        this.channelsCells$.next(channelsCells);
    }

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
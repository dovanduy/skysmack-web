import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { toLocalObject, StrIndex } from '@skysmack/framework';
import { LodgingType } from '@skysmack/packages-lodgings';
import { RatePlan, Channel } from '@skysmack/packages-siteminder';
import { SiteMinderColumn } from '../models/siteminder-column';

@Injectable({ providedIn: 'root' })
export class SiteMinderService {
    // Columns
    public dateColumn$ = new BehaviorSubject<SiteMinderColumn>(null);
    public logingTypeColumns$ = new BehaviorSubject<SiteMinderColumn[]>(null);
    public availabilityColumns$ = new BehaviorSubject<StrIndex<SiteMinderColumn>>(null);
    public ratePlanColumns$ = new BehaviorSubject<StrIndex<SiteMinderColumn[]>>(null);
    public rateSummaryColumns$ = new BehaviorSubject<StrIndex<SiteMinderColumn>>(null);
    public channelsColumns$ = new BehaviorSubject<StrIndex<SiteMinderColumn[]>>(null);

    // Rows
    public dateRows$ = new BehaviorSubject<Date[]>(null);

    // Cells
    public dateCells$ = new BehaviorSubject<StrIndex<Date>>(null);
    public availabilityCells$ = new BehaviorSubject<StrIndex<string>>(null);
    public rateSummaryCells$ = new BehaviorSubject<StrIndex<string>>(null);
    public channelsCells$ = new BehaviorSubject<StrIndex<string[]>>(null);

    constructor(
    ) {
        this.seedColumns();
        this.seedCells();
    }


    private seedColumns(): void {
        // Data
        const lodgingTypes = [
            toLocalObject<LodgingType, number>(new LodgingType({
                id: 1,
                name: 'Single room'
            })),
            // toLocalObject<LodgingType, number>(new LodgingType({
            //     id: 2,
            //     name: 'Double room'
            // })),
            // toLocalObject<LodgingType, number>(new LodgingType({
            //     id: 3,
            //     name: 'Presidents Suite'
            // }))
        ];

        const ratePlans = [
            toLocalObject<RatePlan, number>(new RatePlan({
                id: 1,
                name: 'RatePlan A (With breakfeast)'
            })),
            toLocalObject<RatePlan, number>(new RatePlan({
                id: 2,
                name: 'RatePlan B (No Breakfeast)'
            }))
        ];

        const channels = [
            toLocalObject<Channel, number>(new Channel({
                id: 1,
                name: 'Expedia'
            })),
            toLocalObject<Channel, number>(new Channel({
                id: 2,
                name: 'BookingManager'
            }))
        ];

        // Columns
        const dateColumn = new SiteMinderColumn({ title: 'Date' });
        const lodgingTypeColumns: SiteMinderColumn[] = lodgingTypes.map(lodgingType => new SiteMinderColumn({
            title: lodgingType.object.name
        }));
        const availabilityColumns: StrIndex<SiteMinderColumn> = {};
        const ratePlanColumns: StrIndex<SiteMinderColumn[]> = {};
        const rateSummaryColumns: StrIndex<SiteMinderColumn> = {};
        const channelsColumns: StrIndex<SiteMinderColumn[]> = {};

        lodgingTypeColumns.forEach(ltc => {
            // Availability
            availabilityColumns[ltc.id] = new SiteMinderColumn({
                title: 'Available'
            });

            // Rate Plans
            ratePlanColumns[ltc.id] = ratePlans.map(ratePlan => new SiteMinderColumn({
                title: ratePlan.object.name
            }));
        });

        Object.keys(ratePlanColumns).forEach(key => ratePlanColumns[key].forEach(rpc => {
            rateSummaryColumns[rpc.id] = new SiteMinderColumn({ title: 'Rates (all)' })
            channelsColumns[rpc.id] = channels.map(channel => new SiteMinderColumn({ title: channel.object.name }))
        }));

        // Update streams
        this.dateColumn$.next(dateColumn);
        this.logingTypeColumns$.next(lodgingTypeColumns);
        this.availabilityColumns$.next(availabilityColumns);
        this.ratePlanColumns$.next(ratePlanColumns);
        this.rateSummaryColumns$.next(rateSummaryColumns);
        this.channelsColumns$.next(channelsColumns);
    }

    private seedCells(): void {
        // Data
        const dateRows = [new Date(), new Date(), new Date()];

        // Cells
        const dateCells: StrIndex<Date> = {};
        const availabilityCells: StrIndex<string> = {};
        const rateSummaryCells: StrIndex<string> = {};
        const channelsCells: StrIndex<string[]> = {};

        dateRows.forEach(date => {
            const dateIndex = date.toString();
            dateCells[dateIndex] = date;
            availabilityCells[dateIndex] = '6 (7/-1)';
            rateSummaryCells[dateIndex] = '499-899'
            channelsCells[dateIndex] = [
                '499',
                '899'
            ]
        });

        // Update streams
        this.dateRows$.next(dateRows);
        this.dateCells$.next(dateCells);
        this.availabilityCells$.next(availabilityCells);
        this.rateSummaryCells$.next(rateSummaryCells);
        this.channelsCells$.next(channelsCells);
    }
}
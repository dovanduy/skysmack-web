import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { toLocalObject, StrIndex } from '@skysmack/framework';
import { LodgingType } from '@skysmack/packages-lodgings';
import { RatePlan, Channel, LodgingTypeAvailability, Rate, LodgingTypeAvailabilityKey } from '@skysmack/packages-siteminder';
import { SiteMinderFiltersService } from './siteminder-filters.service';
import { SiteMinderColumn } from '../models/siteminder-column';

@Injectable({ providedIn: 'root' })
export class SiteMinderService {
    public dateColumn$ = new BehaviorSubject<SiteMinderColumn<Date[]>>(null);
    public logingTypeColumns$ = new BehaviorSubject<SiteMinderColumn<null>[]>(null);
    public lodgingTypeAvailability$ = new BehaviorSubject<StrIndex<SiteMinderColumn<LodgingTypeAvailability[]>[]>>(null);
    public lodgingTypeRatePlans$ = new BehaviorSubject<StrIndex<SiteMinderColumn<null>[]>>(null);
    public ratePlanRateSummary$ = new BehaviorSubject<StrIndex<SiteMinderColumn<string[]>[]>>(null); // Better to pass channels
    public ratePlanChannels$ = new BehaviorSubject<StrIndex<SiteMinderColumn<Rate[]>[]>>(null);

    constructor(
        private filters: SiteMinderFiltersService
    ) {
        this.seedMockData();
    }


    private seedMockData() {
        // Data "from redux"
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

        const availability = [
            toLocalObject<LodgingTypeAvailability, LodgingTypeAvailabilityKey>(new LodgingTypeAvailability({
                date: new Date(),
                available: 7,
                availableModifier: -1
            })),
            toLocalObject<LodgingTypeAvailability, LodgingTypeAvailabilityKey>(new LodgingTypeAvailability({
                date: new Date(),
                available: 5,
                availableModifier: 1
            })),
            toLocalObject<LodgingTypeAvailability, LodgingTypeAvailabilityKey>(new LodgingTypeAvailability({
                date: new Date(),
                available: 4,
                availableModifier: 0
            })),
        ];

        // Data processing
        const lodgingTypeColumns: SiteMinderColumn<null>[] = lodgingTypes.map(lodgingType => new SiteMinderColumn<null>({
            title: lodgingType.object.name
        }));

        const lodgingTypeAvailability: StrIndex<SiteMinderColumn<LodgingTypeAvailability[]>[]> = {};
        const lodgingTypeRatePlans: StrIndex<SiteMinderColumn<null>[]> = {};
        const ratePlanRateSummary: StrIndex<SiteMinderColumn<string[]>[]> = {};
        const ratePlanChannels: StrIndex<SiteMinderColumn<Rate[]>[]> = {};

        lodgingTypeColumns.forEach(ltc => {
            // Availability
            lodgingTypeAvailability[ltc.id] = availability.map(avail => new SiteMinderColumn<LodgingTypeAvailability[]>({
                title: 'Available',
                cells: availability.map(x => x.object)
            }));

            // Rate Plans
            const ratePlanColumns = ratePlans.map(ratePlan => new SiteMinderColumn<null>({
                title: ratePlan.object.name
            }));
            lodgingTypeRatePlans[ltc.id] = ratePlanColumns;

            ratePlanColumns.forEach(rpc => {
                // Rate plan summary (lowest to highest)
                ratePlanRateSummary[rpc.id] = ratePlans.map(ratePlan => new SiteMinderColumn<string[]>({
                    title: 'Rates (all)',
                    cells: [
                        // Base these on lowest/highest found in Channels array.
                        // Consider making cells Channels, and calculate in component
                        '799 - 1099',
                        '799 - 1099',
                        '799 - 1099'
                    ]
                }));

                // Rate Plan Channels
                ratePlanChannels[rpc.id] = channels.map(channel => new SiteMinderColumn<Rate[]>({
                    title: channel.object.name,
                    cells: [
                        new Rate({ rate: 799 }),
                        new Rate({ rate: 849 }),
                        new Rate({ rate: 1099 })
                    ]
                }));
            });
        });

        // Pushing cells
        this.dateColumn$.next(new SiteMinderColumn({
            title: 'Date', cells: [new Date(), new Date(), new Date()]
        }));
        this.logingTypeColumns$.next(lodgingTypeColumns);
        this.lodgingTypeAvailability$.next(lodgingTypeAvailability);
        this.lodgingTypeRatePlans$.next(lodgingTypeRatePlans);
        this.ratePlanRateSummary$.next(ratePlanRateSummary);
        this.ratePlanChannels$.next(ratePlanChannels);
    }
}
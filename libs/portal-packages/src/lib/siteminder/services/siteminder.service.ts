import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { toLocalObject } from '@skysmack/framework';
import { LodgingType } from '@skysmack/packages-lodgings';
import { RatePlan, Channel, Rate } from '@skysmack/packages-siteminder';
import { SiteMinderFiltersService } from './siteminder-filters.service';
import { SiteMinderColumn } from '../models/siteminder-column';

@Injectable({ providedIn: 'root' })
export class SiteMinderService {
    private columns$ = new BehaviorSubject<SiteMinderColumn[]>([])

    constructor(
        private filters: SiteMinderFiltersService
    ) {
        this.seedMockData();
    }

    public getColumns(): Observable<SiteMinderColumn[]> {
        return this.columns$
    }

    private seedMockData() {
        const lodgingTypes = [
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

        const columns = lodgingTypes.map(lodgingType => {
            return new SiteMinderColumn({
                lodgingType,
                ratePlanColumns: ratePlans.map(ratePlan => {
                    return {
                        ratePlan,
                        channels
                    };
                })
            })
        });
        console.clear();
        console.log(columns);

        this.columns$.next(columns);
    }
}
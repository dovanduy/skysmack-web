import { RateplanCell } from './rateplan-cell';
import { LodgingTypeAvailabilityKey, LodgingTypeAvailability } from '@skysmack/packages-siteminder';
import { LocalObject } from '@skysmack/framework';

export class LodgingCell {
    public lodgingId: number;
    public availability: LocalObject<LodgingTypeAvailability, LodgingTypeAvailabilityKey>;

    public rateplans: RateplanCell[];

    constructor(init?: Partial<LodgingCell>) {
        Object.assign(this, init);
    }
}
import { RateplanCell } from './rateplan-cell';
import { LodgingTypeAvailabilityKey, LodgingTypeAvailability } from '@skysmack/packages-siteminder';
import { LocalObject } from '@skysmack/framework';
import { LodgingType } from '@skysmack/packages-lodgings';

export class LodgingCell {
    public lodgingType: LocalObject<LodgingType, number>;
    public availability: LocalObject<LodgingTypeAvailability, LodgingTypeAvailabilityKey>;

    public rateplanCells: RateplanCell[];

    constructor(init?: Partial<LodgingCell>) {
        Object.assign(this, init);
    }
}
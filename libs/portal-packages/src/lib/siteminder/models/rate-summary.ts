import { Channel, LodgingTypeRate, LodgingTypeRateKey, RatePlan } from '@skysmack/packages-siteminder';
import { LodgingType } from '@skysmack/packages-lodgings';
import { LocalObject } from '@skysmack/framework';

export class RateSummary {
    public date: Date;
    public ratePlan: LocalObject<RatePlan, number>;
    public channels: Channel[];
    public rates: LocalObject<LodgingTypeRate, LodgingTypeRateKey>[];
    public lodgingType: LocalObject<LodgingType, number>;

    constructor(init?: Partial<RateSummary>) {
        Object.assign(this, init);
    }
}

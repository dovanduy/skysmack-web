import { Channel, LodgingTypeRate, LodgingTypeRateKey } from '@skysmack/packages-siteminder';
import { LodgingType } from '@skysmack/packages-lodgings';
import { LocalObject } from '@skysmack/framework';

export class RateSummary {
    public date: string;
    public ratePlanTitle: string;
    public channels: Channel[];
    public rates: LocalObject<LodgingTypeRate, LodgingTypeRateKey>[];
    public lodgingType: LocalObject<LodgingType, number>;

    constructor(init?: Partial<RateSummary>) {
        Object.assign(this, init);
    }
}

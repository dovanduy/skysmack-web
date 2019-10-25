import { Channel, LodgingTypeRate, LodgingTypeRateKey } from '@skysmack/packages-siteminder';
import { LodgingType } from '@skysmack/packages-lodgings';
import { LocalObject } from '@skysmack/framework';

export class RateInfo {
    public date: Date;
    public ratePlanTitle: string;
    public channel: LocalObject<Channel, number>;
    public rate: LocalObject<LodgingTypeRate, LodgingTypeRateKey>;
    public lodgingType: LocalObject<LodgingType, number>;

    constructor(init?: Partial<RateInfo>) {
        Object.assign(this, init);
    }
}

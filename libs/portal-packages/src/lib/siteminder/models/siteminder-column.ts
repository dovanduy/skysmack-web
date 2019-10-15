import { LocalObject } from '@skysmack/framework';
import { RatePlan, Channel } from '@skysmack/packages-siteminder';
import { LodgingType } from '@skysmack/packages-lodgings';

export class SiteMinderColumn {
    public lodgingType: LocalObject<LodgingType, number>;
    public ratePlansContainer: {
        ratePlan: LocalObject<RatePlan, number>,
        channels: LocalObject<Channel, number>[]
    }[];

    constructor(init?: Partial<SiteMinderColumn>) {
        Object.assign(this, init);
    }
}
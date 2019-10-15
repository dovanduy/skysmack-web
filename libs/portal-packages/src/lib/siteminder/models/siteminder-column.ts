import { LocalObject } from '@skysmack/framework';
import { RatePlan, Channel, Rate } from '@skysmack/packages-siteminder';
import { LodgingType } from '@skysmack/packages-lodgings';

export class SiteMinderColumn {
    public lodgingType: LocalObject<LodgingType, number>;
    public ratePlanContainers: {
        ratePlan: LocalObject<RatePlan, number>,
        channels: LocalObject<Channel, number>[]
    }[];

    constructor(init?: Partial<SiteMinderColumn>) {
        Object.assign(this, init);
    }
}
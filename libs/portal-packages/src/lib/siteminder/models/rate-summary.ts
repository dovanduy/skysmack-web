import { Channel, LodgingTypeRate } from '@skysmack/packages-siteminder';
import { LodgingType } from '@skysmack/packages-lodgings';

export class RateSummary {
    public date: Date;
    public ratePlanTitle: string;
    public channels: Channel[];
    public rates: LodgingTypeRate[];
    public lodgingType: LodgingType;

    constructor(init?: Partial<RateSummary>) {
        Object.assign(this, init);
    }
}

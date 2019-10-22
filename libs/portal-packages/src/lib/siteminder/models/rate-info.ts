import { Channel, LodgingTypeRate } from '@skysmack/packages-siteminder';
import { LodgingType } from '@skysmack/packages-lodgings';

export class RateInfo {
    public date: Date;
    public ratePlanTitle: string;
    public channel: Channel;
    public rate: LodgingTypeRate;
    public lodgingType: LodgingType;

    constructor(init?: Partial<RateInfo>) {
        Object.assign(this, init);
    }
}

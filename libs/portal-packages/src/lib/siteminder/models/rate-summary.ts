import { Channel, LodgingTypeRate } from '@skysmack/packages-siteminder';

export class RateSummary {
    public date: Date;
    public ratePlanTitle: string;
    public channels: Channel[];
    public rates: LodgingTypeRate[];

    constructor(init?: Partial<RateSummary>) {
        Object.assign(this, init);
    }
}

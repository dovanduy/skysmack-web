import { ChannelColumn } from './channel-column';
import { RatePlan } from '@skysmack/packages-siteminder';
import { LocalObject } from '@skysmack/framework';

export class RateplanColumn {
    public id: number;
    public title: string;
    public rateplan: LocalObject<RatePlan, number>;

    public channels: ChannelColumn[];

    constructor(init?: Partial<RateplanColumn>) {
        Object.assign(this, init);
    }
}
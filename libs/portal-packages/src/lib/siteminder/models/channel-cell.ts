import { LocalObject } from '@skysmack/framework';
import { LodgingTypeRate, LodgingTypeRateKey } from '@skysmack/packages-siteminder';

export class ChannelCell {
    public channelId: number;
    public rateInfo: LocalObject<LodgingTypeRate, LodgingTypeRateKey>;

    constructor(init?: Partial<ChannelCell>) {
        Object.assign(this, init);
    }
}
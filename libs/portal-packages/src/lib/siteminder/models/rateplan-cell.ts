import { ChannelCell } from './channel-cell';
import { LocalObject } from '@skysmack/framework';
import { RatePlan } from '@skysmack/packages-siteminder';

export class RateplanCell {
    public rateplanId: number;
    public rateplan: LocalObject<RatePlan, number>;

    public channelCells: ChannelCell[];

    public displayRateSummary(): string {
        const rates = this.channelCells.filter(channel => channel.rateInfo).map(channel => channel.rateInfo.object.rate);
        if (rates && rates.length) {
            const minRate = Math.min(...rates);

            if (rates.length > 1) {
                const maxRate = Math.max(...rates);
                if (minRate !== maxRate) {
                    return minRate + " - " + maxRate;
                }
            }

            return minRate.toString();
        }
        return "";
    }

    constructor(init?: Partial<RateplanCell>) {
        Object.assign(this, init);
    }
}
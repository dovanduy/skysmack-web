import { RateInfo } from './rate-info';

export class ChannelCell {
    public channelId: number;
    public rateInfo: RateInfo;

    constructor(init?: Partial<ChannelCell>) {
        Object.assign(this, init);
    }
}
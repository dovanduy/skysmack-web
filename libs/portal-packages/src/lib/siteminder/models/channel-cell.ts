import { RateInfo } from './rate-info';

export class ChannelCell {
    public channelId: number;
    public rateInfo: RateInfo;
    public restrictionInfo: unknown; // DEFINE THIS!!!

    constructor(init?: Partial<ChannelCell>) {
        Object.assign(this, init);
    }
}
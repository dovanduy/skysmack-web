import { ChannelCell } from './channel-cell';
import { RateInfo } from './rate-info';
import { RateSummary } from './rate-summary';

export class RateplanCell {
    public rateplanId: number;
    public rateSummaryCell: RateSummary;
    public restrictionSummaryCell: unknown; // DEFINE THIS!!!

    public channelCells: ChannelCell[];

    constructor(init?: Partial<RateplanCell>) {
        Object.assign(this, init);
    }
}
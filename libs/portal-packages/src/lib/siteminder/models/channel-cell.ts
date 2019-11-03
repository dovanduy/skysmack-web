import { AvailabilityRestriction } from '@skysmack/packages-siteminder';

export class ChannelCell {
    public channelId: number;
    
    public rate: number;
    
    public restriction: AvailabilityRestriction;
    public minimumLengthOfStay: number;
    public maximumLengthOfStay: number;

    constructor(init?: Partial<ChannelCell>) {
        Object.assign(this, init);
    }
}
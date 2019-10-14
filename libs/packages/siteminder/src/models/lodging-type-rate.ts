import { Record } from '@skysmack/framework';
import { AvailabilityRestriction } from './availability-restriction';

export class LodgingTypeRateKey {
    public date: Date;
    public lodgingTypeId: number;
    public ratePlanId: number;
    public channelId: number;
}

export class LodgingTypeRate extends Record<LodgingTypeRateKey> {
    public date: Date;
    public restriction: AvailabilityRestriction;
    public minimumLengthOfStay: number;
    public maximumLengthOfStay: number;
    public rate: number;
    public lodgingTypeId: number;
    public ratePlanId: number;
    public channelId: number;
}

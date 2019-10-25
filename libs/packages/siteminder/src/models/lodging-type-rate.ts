import { Record, LocalObject } from '@skysmack/framework';
import { AvailabilityRestriction } from './availability-restriction';
import { LodgingType } from '@skysmack/packages-lodgings';

export class LodgingTypeRateKey {
    public date: Date;
    public lodgingTypeId: number;
    public ratePlanId: number;
    public channelId: number;
}

export class LodgingTypeRate extends Record<LodgingTypeRateKey> {
    public date: string;
    public restriction: AvailabilityRestriction;
    public minimumLengthOfStay: number;
    public maximumLengthOfStay: number;
    public rate: number;
    public lodgingTypeId: number;
    public lodgingType: LocalObject<LodgingType, number>;
    public ratePlanId: number;
    public channelId: number;

    constructor(init?: Partial<LodgingTypeRate>) {
        super(init);
        Object.assign(this, init);
    }
}

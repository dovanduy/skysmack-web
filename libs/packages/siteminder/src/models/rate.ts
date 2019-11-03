import { LocalObject } from '@skysmack/framework';
import { RatePlan } from './rate-plan';
import { LodgingType } from '@skysmack/packages-lodgings';
import { AvailabilityRestriction } from './availability-restriction';

/** 
 * Only used for updating data.
 */
export class Rate {
    public start: Date;
    public end: Date;
    public lodgingTypeId: number;
    public lodgingType: LocalObject<LodgingType, number>;
    public ratePlanId?: number;
    public ratePlan?: LocalObject<RatePlan, number>;
    public channels: number[];
    public restriction: AvailabilityRestriction;
    public minimumLengthOfStay: number;
    public maximumLengthOfStay: number;
    public rate: number;

    public constructor(init?: Partial<Rate>) {
        Object.assign(this, init);
    }
}
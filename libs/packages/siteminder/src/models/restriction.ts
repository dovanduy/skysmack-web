import { AvailabilityRestriction } from './availability-restriction';

export class Restriction {
    public start: Date;
    public end: Date;
    public lodgingTypeId: number;
    public ratePlanId?: number;
    public channels: number[];
    public minimumLengthOfStay: number;
    public maximumLengthOfStay: number;
    public restriction: AvailabilityRestriction;

    public constructor(init?: Partial<Restriction>) {
        Object.assign(this, init);
    }
}
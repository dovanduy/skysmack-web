import { LocalObject } from '@skysmack/framework';
import { RatePlan } from './rate-plan';
import { LodgingType } from '@skysmack/packages-lodgings';

export class Rate {
    public start: Date;
    public end: Date
    public lodgingTypeId: number;
    public lodgingType: LocalObject<LodgingType, number>;
    public ratePlanId?: number;
    public ratePlan?: LocalObject<RatePlan, number>;
    public channels: number[];
    public rate: number;

    public constructor(init?: Partial<Rate>) {
        Object.assign(this, init);
    }
}
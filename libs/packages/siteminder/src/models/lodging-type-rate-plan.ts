import { Record } from '@skysmack/framework';

export class LodgingTypeRatePlanKey {
    public lodgingTypeId: number;
    public ratePlanId: number;
}

export class LodgingTypeRatePlan extends Record<LodgingTypeRatePlanKey> {
    public lodgingTypeId: number;
    public ratePlanId: number;

    public constructor(init?: Partial<LodgingTypeRatePlan>) {
        super(init);
        Object.assign(this, init);
    }
}
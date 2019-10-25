import { Record, LocalObject } from '@skysmack/framework';
import { LodgingType } from '@skysmack/packages-lodgings';

export class LodgingTypeAvailabilityKey {
    public date: Date;
    public lodgingTypeId: number;
    public ratePlanId: number;
    public channelId: number;
}

export class LodgingTypeAvailability extends Record<LodgingTypeAvailabilityKey> {
    public date: string;
    public available: number;
    public availableModifier: number;
    public lodgingTypeId: number;
    public lodgingType: LocalObject<LodgingType, number>;

    constructor(init?: Partial<LodgingTypeAvailability>) {
        super(init);
        Object.assign(this, init);
    }
}

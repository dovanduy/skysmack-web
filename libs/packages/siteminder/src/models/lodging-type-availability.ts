import { Record } from '@skysmack/framework';

export class LodgingTypeAvailabilityKey {
    public date: Date;
    public lodgingTypeId: number;
    public ratePlanId: number;
    public channelId: number;
}

export class LodgingTypeAvailability extends Record<LodgingTypeAvailabilityKey> {
    public date: Date;
    public available: number;
    public availableModifier: number;
    public lodgingTypeId: number;
}

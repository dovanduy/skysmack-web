import { Record } from '@skysmack/framework';

export class LodgingTypeRatePlanChannelKey {
    public lodgingTypeId: number;
    public ratePlanId: number;
    public channelId: number;
}

export class LodgingTypeRatePlanChannel extends Record<LodgingTypeRatePlanChannelKey> {
    public lodgingTypeId: number;
    public ratePlanId: number;
    public channelId: number;

    public constructor(init?: Partial<LodgingTypeRatePlanChannel>) {
        super(init);
        Object.assign(this, init);
    }
}
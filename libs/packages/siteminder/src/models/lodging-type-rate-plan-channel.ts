import { Record, LocalObject } from '@skysmack/framework';
import { RatePlan } from './rate-plan';
import { Channel } from './channel';
import { LodgingType } from '@skysmack/packages-lodgings';

export class LodgingTypeRatePlanChannelKey {
    public lodgingTypeId: number;
    public ratePlanId: number;
    public channelId: number;
}

export class LodgingTypeRatePlanChannel extends Record<LodgingTypeRatePlanChannelKey> {
    public lodgingTypeId: number;
    public lodgingType: LocalObject<LodgingType, number>;
    public ratePlanId: number;
    public ratePlan: LocalObject<RatePlan, number>;
    public channelId: number;
    public channel: LocalObject<Channel, number>;

    public constructor(init?: Partial<LodgingTypeRatePlanChannel>) {
        super(init);
        Object.assign(this, init);
    }
}
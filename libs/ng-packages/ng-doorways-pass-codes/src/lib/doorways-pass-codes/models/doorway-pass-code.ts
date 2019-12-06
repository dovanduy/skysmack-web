import { Record, LocalObject } from "@skysmack/framework";
import { Doorway } from '@skysmack/ng-doorways';
import { PassCode } from 'libs/packages/pass-codes/src';

export class DoorwayPassCodeKey {
    public doorwayId: number;
    public passCodeId: number;
}

export class DoorwayPassCode extends Record<DoorwayPassCodeKey> {
    public doorwayId: number;
    public doorway: LocalObject<Doorway, number>;
    public passCodeId: number;
    public passCode: LocalObject<PassCode, number>;
    public validFrom?: Date;
    public validTo?: Date;
    public disabled: boolean;

    public constructor(init?: Partial<DoorwayPassCode>) {
        super();
        Object.assign(this, init);
    }
}
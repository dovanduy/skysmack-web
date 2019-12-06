import { Record } from "@skysmack/framework";

export class DoorwayPassCodeKey {
    public DoorwayId: number;
    public PassCodeId: number;
}

export class DoorwayPassCode extends Record<DoorwayPassCodeKey> {
    public doorwayId: number
    public passCodeId: number;
    public validFrom?: Date;
    public validTo?: Date;
    public disabled: boolean;

    public constructor(init?: Partial<DoorwayPassCode>) {
        super();
        Object.assign(this, init);
    }
}
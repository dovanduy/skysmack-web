import { Record, LocalObject } from "@skysmack/framework";
import { Doorway } from '@skysmack/ng-doorways';

export class AccessPoint extends Record<string> {
    public doorwayId: number;
    public doorway: LocalObject<Doorway, number>;

    public constructor(init?: Partial<AccessPoint>) {
        super();
        Object.assign(this, init);
    }
}
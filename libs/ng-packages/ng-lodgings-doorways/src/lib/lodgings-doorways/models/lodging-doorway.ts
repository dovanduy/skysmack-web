import { Record, LocalObject } from "@skysmack/framework";
import { Doorway } from '@skysmack/ng-doorways';
import { Lodging } from '@skysmack/packages-lodgings';

export class LodgingDoorwayKey {
    public doorwayId: number;
    public lodgingId: number;
}

export class LodgingDoorway extends Record<LodgingDoorwayKey> {
    public doorwayId: number;
    public doorway: LocalObject<Doorway, number>;
    public lodgingId: number;
    public lodging: LocalObject<Lodging, number>;

    public constructor(init?: Partial<LodgingDoorway>) {
        super();
        Object.assign(this, init);
    }
}
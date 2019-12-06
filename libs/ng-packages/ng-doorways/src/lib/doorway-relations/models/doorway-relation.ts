import { Record, LocalObject } from "@skysmack/framework";
import { Doorway } from '../../doorways/models/doorway';

export class DoorwayRelationKey {
    public outerDoorwayId: number;
    public innerDoorwayId: number;
}

export class DoorwayRelation extends Record<DoorwayRelationKey> {
    public outerDoorwayId: number;
    public outerDoorway: LocalObject<Doorway, number>;

    public innerDoorwayId: number;
    public innerDoorway: LocalObject<Doorway, number>;

    public constructor(init?: Partial<DoorwayRelation>) {
        super();
        Object.assign(this, init);
    }
}
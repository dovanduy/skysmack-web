import { Record } from "@skysmack/framework";

export class DoorwayRelationKey {
    public outerDoorwayId: number;
    public innerDoorwayId: number;
}

export class DoorwayRelation extends Record<DoorwayRelationKey> {
    public outerDoorwayId: string;
    public innerDoorwayId: string;

    public constructor(init?: Partial<DoorwayRelation>) {
        super();
        Object.assign(this, init);
    }
}
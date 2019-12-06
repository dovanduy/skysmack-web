export class DoorwaysRelationSettings {
    public allowCircularRelations: string;

    constructor(values: Partial<DoorwaysRelationSettings>) {
        Object.assign(this, values);
    }
}

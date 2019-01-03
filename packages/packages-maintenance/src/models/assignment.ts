import { DocumentRecord } from "@skysmack/framework";

export class Assignment extends DocumentRecord<number> {
    public id: number;
    public description: string;
    public assignmentTypeId: number;
    [key: string]: any;
    public occupationState: 'created' | 'pending' | 'ongoing' | 'done' | 'canceled' | 'faulted';
    public static OccupationStateEnum = {
        Vacant: 'vacant',
        Occupied: 'occupied',
        Disabled: 'disabled',
        Created: 'created',
        Pending: 'pending',
        Ongoing: 'ongoing',
        Done: 'done',
        Canceled: 'canceled',
        Faulted: 'faulted'
    }


    public constructor(init?: Partial<Assignment>) {
        super();
        Object.assign(this, init);
    }
}
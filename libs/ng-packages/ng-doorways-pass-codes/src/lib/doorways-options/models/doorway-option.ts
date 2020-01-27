import { Record } from "@skysmack/framework";

export class DoorwayOption extends Record<number> {
    public startPeriod: string;
    public endPeriod: string;
    public required: boolean;

    public constructor(init?: Partial<DoorwayOption>) {
        super();
        Object.assign(this, init);
    }
}
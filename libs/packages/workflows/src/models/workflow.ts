import { Record } from "@skysmack/framework";


export class Workflow extends Record<number> {
    public url: string;
    public packagePath: string;
    public source: string;
    public eventType: string;

    public constructor(init?: Partial<Workflow>) {
        super();
        Object.assign(this, init);
    }
}
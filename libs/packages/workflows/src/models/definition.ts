import { Record } from "@skysmack/framework";


export class Definition extends Record<number> {
    public url: string;
    public packagePath: string;
    public source: string;
    public eventType: string;

    public constructor(init?: Partial<Definition>) {
        super();
        Object.assign(this, init);
    }
}
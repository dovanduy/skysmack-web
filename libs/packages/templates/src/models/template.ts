import { Record, StrIndex } from "@skysmack/framework";

export class Template extends Record<number> {
    public title: string;
    public body: string;
    public dataRoutes: StrIndex<string>;

    public constructor(init?: Partial<Template>) {
        super();
        Object.assign(this, init);
    }
}
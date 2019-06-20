import { Record } from "@skysmack/framework";

export class Terminal extends Record<number> {
    public name: string;
    public connectionString: string;
    public description: string;
    public constructor(init?: Partial<Terminal>) {
        super();
        Object.assign(this, init);
    }
}

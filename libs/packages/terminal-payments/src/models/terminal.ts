import { Record } from "@skysmack/framework";

export class Terminal extends Record<number> {
    public constructor(init?: Partial<Terminal>) {
        super();
        Object.assign(this, init);
    }
}

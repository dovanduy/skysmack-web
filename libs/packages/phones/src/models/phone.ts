import { Record } from "@skysmack/framework";

export class Phone extends Record<number> {
    public name: string;

    public constructor(init?: Partial<Phone>) {
        super();
        Object.assign(this, init);
    }
}
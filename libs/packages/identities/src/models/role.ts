import { Record } from "@skysmack/framework";

export class Role extends Record<number> {
    public name: string;

    public constructor(init?: Partial<Role>) {
        super();
        Object.assign(this, init);
    }
}
import { Record } from "@skysmack/framework";

export class User extends Record<number> {
    public email: string;

    public constructor(init?: Partial<User>) {
        super();
        Object.assign(this, init);
    }
}
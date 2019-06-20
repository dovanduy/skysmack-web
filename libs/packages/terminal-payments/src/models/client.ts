import { Record } from "@skysmack/framework";

export class Client extends Record<number> {
    public name: string;
    public description: string;
    public readonly online: boolean;

    public constructor(init?: Partial<Client>) {
        super();
        Object.assign(this, init);
    }
}

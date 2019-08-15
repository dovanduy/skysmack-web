import { Record } from "@skysmack/framework";

export class Client extends Record<string> {
    public name: string;
    public description: string;
    public online: boolean;

    public constructor(init?: Partial<Client>) {
        super();
        Object.assign(this, init);
    }
}

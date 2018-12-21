import { DocumentRecord } from "@skysmack/framework";

export class Person extends DocumentRecord<number> {
    public firstName: string;
    public lastName: string;
    public displayName: string;

    public constructor(init?: Partial<Person>) {
        super();
        Object.assign(this, init);
    }
}
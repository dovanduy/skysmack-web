import { DocumentRecord } from "@skysmack/framework";

export class Person implements DocumentRecord<number> {
    public Id: number;
    [key: string]: any;

    public constructor(init?: Partial<Person>) {
        Object.assign(this, init);
    }
}
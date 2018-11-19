import { DocumentRecord } from "@skysmack/framework";

export class Person implements DocumentRecord<number> {
    public id: number;
    public firstName: string;
    public lastName: string;
    public displayName: string;
    [key: string]: any;

    public constructor(init?: Partial<Person>) {
        Object.assign(this, init);
    }
}
import { DocumentRecord } from "./document-record";

export class MenuItem extends DocumentRecord<number>{
    public url: string;
    public displayName: string;
    public area: string;
    public order: number;
    public icon: string;
    public permissions?: string[]

     public constructor(init?: Partial<MenuItem>) {
        super();
        Object.assign(this, init);
    }
}
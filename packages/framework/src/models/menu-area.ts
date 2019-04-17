import { DocumentRecord } from "./document-record";

export class MenuArea extends DocumentRecord<number>{
    public displayName: string;
    public area: string;
    public translationPrefix: string;
    public order: number;

    public constructor(init?: Partial<MenuArea>) {
        super();
        Object.assign(this, init);
        this.displayName = this.translationPrefix + this.area.toUpperCase();
    }
}

export class MenuArea {
    public displayName: string;
    public area: string;
    public icon: string;
    public translationPrefix: string;
    public order: number;
    public display = true;

    public constructor(init?: Partial<MenuArea>) {
        Object.assign(this, init);
        this.displayName = `${this.translationPrefix}${this.area.toUpperCase()}`;
    }
}

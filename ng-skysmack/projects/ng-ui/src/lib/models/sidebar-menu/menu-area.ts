
export class MenuArea {
    public displayName: string;

    constructor(
        public area: string,
        public translationPrefix: string,
        public order: number,
    ) {
        this.displayName = translationPrefix + area.toUpperCase();
    }
}

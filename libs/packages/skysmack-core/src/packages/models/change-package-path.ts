export class ChangePackagePath {
    public newPath: string;
    public previousPath: string;

    public constructor(init?: Partial<ChangePackagePath>) {
        Object.assign(this, init);
    }
}

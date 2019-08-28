export class Bucket {
    public bucket: string;

    public constructor(init?: Partial<Bucket>) {
        Object.assign(this, init);
    }
}
export class Bucket {
    public bucket: string;
    public projectId: string;

    public constructor(init?: Partial<Bucket>) {
        Object.assign(this, init);
    }
}
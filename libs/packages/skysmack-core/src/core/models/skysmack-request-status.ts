export class SkysmackRequestStatus {
    public error: string;
    public errorCode: number;
    public errorDescription: string;

    public constructor(init?: Partial<SkysmackRequestStatus>) {
        Object.assign(this, init);
    }
}
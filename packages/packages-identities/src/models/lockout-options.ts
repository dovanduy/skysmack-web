export class LockoutOptions {
    public allowedForNewUsers: boolean = true;
    public maxFailedAccessAttempts: number;
    public defaultLockoutTimeSpan: string;
    constructor(values: Partial<LockoutOptions>) {
        Object.assign(this, values);
    }
}
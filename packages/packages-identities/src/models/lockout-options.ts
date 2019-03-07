export class LockoutOptions {
    public allowedForNewUsers: boolean = true;
    public maxFailedAccessAttempts: number = 0;
    public defaultLockoutTimeSpan: Date;
    constructor(values: Partial<LockoutOptions>) {
        Object.assign(this, values);
    }
}
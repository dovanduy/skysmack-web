export class LockoutSettings {
    public allowedForNewUsers: boolean;
    public maxFailedAccessAttempts: number;
    public defaultLockoutTimeSpan: Date;
    constructor(values: Partial<LockoutSettings>) {
        Object.assign(this, values);
    }
}
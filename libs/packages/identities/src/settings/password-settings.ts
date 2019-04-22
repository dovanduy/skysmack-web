export class PasswordSettings {
    public requiredLength: number;
    public requiredUniqueChars: number;
    public requireNonAlphanumeric: boolean;
    public requireLowercase: boolean;
    public requireUppercase: boolean;
    public requireDigit: boolean;
    constructor(values: Partial<PasswordSettings>) {
        Object.assign(this, values);
    }
}
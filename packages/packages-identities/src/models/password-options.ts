export class PasswordOptions {
    public requiredLength: number;
    public requiredUniqueChars: number;
    public requireNonAlphanumeric: boolean = true;
    public requireLowercase: boolean = true;
    public requireUppercase: boolean = true;
    public requireDigit: boolean = true;
    constructor(values: Partial<PasswordOptions>) {
        Object.assign(this, values);
    }
}
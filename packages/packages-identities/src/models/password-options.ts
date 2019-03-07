export class PasswordOptions {
    public requiredLength: number = 0;
    public requiredUniqueChars: number = 0;
    public requireNonAlphanumeric: boolean = true;
    public requireLowercase: boolean = true;
    public requireUppercase: boolean = true;
    public requireDigit: boolean = true;
    constructor(values: Partial<PasswordOptions>) {
        Object.assign(this, values);
    }
}
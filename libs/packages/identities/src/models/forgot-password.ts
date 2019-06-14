export class ForgotPassword {
    public email: string;

    constructor(values: Partial<ForgotPassword>) {
        Object.assign(this, values);
    }
}
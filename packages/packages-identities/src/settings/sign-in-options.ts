export class SignInOptions {
    public requireConfirmedEmail: boolean = true;
    public requireConfirmedPhoneNumber: boolean = true;
    constructor(values: Partial<SignInOptions>) {
        Object.assign(this, values);
    }
}
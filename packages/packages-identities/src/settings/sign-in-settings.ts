export class SignInSettings {
    public requireConfirmedEmail: boolean;
    public requireConfirmedPhoneNumber: boolean;
    constructor(values: Partial<SignInSettings>) {
        Object.assign(this, values);
    }
}
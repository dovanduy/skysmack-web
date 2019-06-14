export class ConfirmEmail {
    public email: string;
    public token: string;

    constructor(values: Partial<ConfirmEmail>) {
        Object.assign(this, values);
    }
}
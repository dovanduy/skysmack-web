export class ChangePassword {
    public currentPassword: string;
    public newPassword: string;
    public confirmNewPassword: string;

    constructor(values: Partial<ChangePassword>) {
        Object.assign(this, values);
    }
}
export class UserSettings {
    public allowedUserNameCharacters: string;
    public requireUniqueEmail: boolean;
    constructor(values: Partial<UserSettings>) {
        Object.assign(this, values);
    }
}
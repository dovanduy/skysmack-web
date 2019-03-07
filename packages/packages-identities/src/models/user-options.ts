export class UserOptions {
    public allowedUserNameCharacters: string = '';
    public requireUniqueEmail: boolean = true;
    constructor(values: Partial<UserOptions>) {
        Object.assign(this, values);
    }
}
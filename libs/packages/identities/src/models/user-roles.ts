
export class UserRoles {
    public userId: number;
    public roleNames: string[];

    public constructor(init?: Partial<UserRoles>) {
        Object.assign(this, init);
    }
}
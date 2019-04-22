import { Record } from "@skysmack/framework";

export class AccessPolicyRule extends Record<number> {
    public access: boolean;
    public authenticated?: boolean;
    public includeRoles: boolean;

    public constructor(init?: Partial<AccessPolicyRule>) {
        super();
        Object.assign(this, init);
    }
}
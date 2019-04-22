import { Record } from "@skysmack/framework";
import { AccessPolicyRoleKey } from "./access-policy-role-key";

export class AccessPolicyRole extends Record<AccessPolicyRoleKey> {
    public constructor(init?: Partial<AccessPolicyRole>) {
        super();
        Object.assign(this, init);
    }
}

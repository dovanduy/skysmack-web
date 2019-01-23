import { Record } from "@skysmack/framework";

export class AccessPolicyRole extends Record<number> {
    public ruleId: number;
    public roleId: number;

    public constructor(init?: Partial<AccessPolicyRole>) {
        super();
        Object.assign(this, init);
    }
}
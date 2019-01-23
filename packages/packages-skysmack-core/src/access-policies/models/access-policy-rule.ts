import { Record } from "@skysmack/framework";

export class AccessPolicyRule extends Record<number> {
    public ruleId: number;
    public roleId: number;

    public constructor(init?: Partial<AccessPolicyRule>) {
        super();
        Object.assign(this, init);
    }
}
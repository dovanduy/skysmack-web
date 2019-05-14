import { Record, LocalObject } from "@skysmack/framework";
import { AccessPolicyRule } from './access-policy-rule';

export class AccessPolicyPermission extends Record<number> {
    public ruleId: number;
    public rule: LocalObject<AccessPolicyRule, number>;
    public permission: string;
    public packagePath: string;
    public order: number;
    public isTopLevel: boolean;

    public constructor(init?: Partial<AccessPolicyPermission>) {
        super();
        Object.assign(this, init);
    }
}
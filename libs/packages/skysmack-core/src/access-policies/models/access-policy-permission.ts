import { Record } from "@skysmack/framework";

export class AccessPolicyPermission extends Record<number> {
    public ruleId: number;
    public permission: string;
    public packagePath: string;
    public order: number;
    public isTopLevel: boolean;

    public constructor(init?: Partial<AccessPolicyPermission>) {
        super();
        Object.assign(this, init);
    }
}
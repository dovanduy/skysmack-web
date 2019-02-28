export class AccessPolicyRoleKey {
  public ruleId: number;
  public roleId: number;
  public constructor(init?: Partial<AccessPolicyRoleKey>) {
    Object.assign(this, init);
  }
}

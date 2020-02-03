export class TemplatePackageSettings {
    public templatePackagePath: string;
    public confirmEmailTemplateId: number;
    public resetPasswordTemplateId: number;

    constructor(values: Partial<TemplatePackageSettings>) {
        Object.assign(this, values);
    }
}
export class OpenApiDocumentSettings {
    public title: string;
    public description: string;
    public termsOfService: string;
    public contactName: string;
    public contactUrl: string;
    public contactEmail: string;
    public licenseName: string;
    public licenseUrl: string;

    constructor(values: Partial<OpenApiDocumentSettings>) {
        Object.assign(this, values);
    }
}
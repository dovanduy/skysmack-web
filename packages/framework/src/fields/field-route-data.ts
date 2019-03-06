export class FieldRouteData {
    public actionToken: string;
    public storeToken: string;
    public fieldsConfigToken?: string;
    constructor(values: Partial<FieldRouteData>) {
        Object.assign(this, values);
    }
}
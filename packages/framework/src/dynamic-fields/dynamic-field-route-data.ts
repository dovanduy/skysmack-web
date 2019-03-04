export class DynamicFieldRouteData {
    public actionToken: string;
    public storeToken: string;
    public fieldsConfigToken?: string;
    constructor(values: Partial<DynamicFieldRouteData>) {
        Object.assign(this, values);
    }
}
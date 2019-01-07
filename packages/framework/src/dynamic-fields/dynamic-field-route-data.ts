export class DynamicFieldRouteData {
    public actionToken: string;
    public storeToken: string;
    constructor(values: DynamicFieldRouteData) {
        Object.assign(this, values);
    }
}
export class RouteData {
    fieldsConfigToken?: string;

    constructor(values: Partial<RouteData>) {
        Object.assign(this, values);
    }
}
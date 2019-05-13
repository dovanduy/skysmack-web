export class DependencyOptions {
    public relationSelector: string;
    public relationIdSelector: string;
    public stateSelector: string;

    constructor(values: Partial<DependencyOptions>) {
        Object.assign(this, values);
    }
}
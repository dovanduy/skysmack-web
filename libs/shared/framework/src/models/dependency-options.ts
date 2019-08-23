import { Observable } from 'rxjs';
import { LocalObject } from './local-object';
import { Package } from './package';

export class DependencyOptions {
    public relationSelector: string;
    public relationIdSelector: string;
    public stateSelector: string;
    public dependencyIndexes: number[] = [];

    public targetPackage$: Observable<LocalObject<Package, string>>;

    constructor(values: Partial<DependencyOptions>) {
        Object.assign(this, values);
    }
}
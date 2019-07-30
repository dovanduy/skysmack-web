import { BehaviorSubject } from 'rxjs';

export class Dashboard {
    public packagePath: string;
    public component: any;
    public render$: BehaviorSubject<boolean> = new BehaviorSubject(true);
    public show$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(values: Partial<Dashboard>) {
        Object.assign(this, values);
    }
}

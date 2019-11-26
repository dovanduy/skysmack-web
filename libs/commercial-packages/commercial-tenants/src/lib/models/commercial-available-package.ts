import { DevelopmentState } from './development-state';

export class CommercialAvailablePackage {
    public name?: string;
    public description?: string;
    public category?: string;
    public type?: string;
    public dependencyTypes?: string[];
    public permissions?: string[];
    public state?: DevelopmentState;
    public required?: boolean;
    public multipleInstalls?: boolean;

    public constructor(init?: Partial<CommercialAvailablePackage>) {
        Object.assign(this, init);
    }
}

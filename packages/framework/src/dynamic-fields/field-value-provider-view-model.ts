import { Identifiable } from '../models';

export class FieldValueProviderViewModel extends Identifiable<string> {
    public name?: string;
    public validators?: Array<string>;
    public get identifier(): string {
        return this.name;
    };
    public set identifier(v: string) {
        this.name = v;
    };
}

import { Field } from './field';

export abstract class FieldProvider {
    public abstract getFields(packagePath: string): Observable<Field[]>;
}

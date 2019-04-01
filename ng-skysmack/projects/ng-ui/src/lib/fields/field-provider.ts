import { Field } from './field';
import { Observable } from 'rxjs';

export abstract class FieldProvider {
    public abstract getFields(packagePath: string): Observable<Field[]>;
}

import { Observable } from 'rxjs';
import { Field } from '@skysmack/ng-ui';

export abstract class FieldProvider {
    public abstract getFields(packagePath: string): Observable<Field[]>;
}

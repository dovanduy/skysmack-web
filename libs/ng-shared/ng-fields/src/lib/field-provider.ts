import { Observable } from 'rxjs';
import { Field } from '@skysmack/ng-dynamic-forms';
import { LocalObject } from '@skysmack/framework';

export abstract class FieldProvider {
    public abstract id: string;
    public abstract getFields(packagePath: string, additionalPaths: string[], area: string, entity?: LocalObject<any, any>): Observable<Field[]>;
}

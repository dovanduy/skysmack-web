import { Observable } from 'rxjs';
import { Field } from '@skysmack/ng-ui';
import { LocalObject } from '@skysmack/framework';

export abstract class FieldProvider {
    public abstract getFields(packagePath: string, area: string, entity?: LocalObject<any, any>): Observable<Field[]>;
}

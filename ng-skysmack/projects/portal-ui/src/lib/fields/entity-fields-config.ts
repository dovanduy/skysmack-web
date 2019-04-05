import { LocalObject, FieldSchemaViewModel } from '@skysmack/framework';
import { LoadedPackage } from '@skysmack/ng-packages';
import { Field } from '@skysmack/ng-ui';
import { Observable } from 'rxjs';


export interface EntityFieldsConfig<TObject, TKey> {
    getFields(loadedPackage: LoadedPackage, entity?: LocalObject<TObject, TKey>, fields?: LocalObject<FieldSchemaViewModel, string>[]): Observable<Field[]>;
}

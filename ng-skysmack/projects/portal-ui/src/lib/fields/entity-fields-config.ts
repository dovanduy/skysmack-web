import { LocalObject } from '@skysmack/framework';
import { LoadedPackage } from '@skysmack/ng-packages';
import { Field, FormRule, Validation } from '@skysmack/ng-ui';
import { Observable } from 'rxjs';


export interface EntityFieldsConfig<TObject, TKey> {
    formRules: FormRule[];
    validation: Validation;
    getFields(loadedPackage: LoadedPackage, entity?: LocalObject<TObject, TKey>): Observable<Field[]>;
}

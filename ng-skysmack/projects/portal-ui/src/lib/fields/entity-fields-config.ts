import { LocalObject } from '@skysmack/framework';
import { Field, FormRule, Validation } from '@skysmack/ng-ui';
import { Observable } from 'rxjs';
import { LoadedPackage } from '@skysmack/ng-redux';


export interface EntityFieldsConfig<TObject, TKey> {
    formRules: FormRule[];
    validation: Validation;
    getFields(loadedPackage: LoadedPackage, entity?: LocalObject<TObject, TKey>): Observable<Field[]>;
}

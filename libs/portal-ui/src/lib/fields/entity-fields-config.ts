import { LocalObject } from '@skysmack/framework';
import { Field, FormRule, Validation } from '@skysmack/ng-dynamic-forms';
import { Observable } from 'rxjs';
import { LoadedPackage } from '@skysmack/ng-framework';


export interface EntityFieldsConfig<TObject, TKey> {
    formRules: FormRule[];
    validation: Validation;
    getFields(loadedPackage: LoadedPackage, entity?: LocalObject<TObject, TKey>): Observable<Field[]>;
}

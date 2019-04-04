import { LocalObject, FieldSchemaViewModel } from '@skysmack/framework';
import { LoadedPackage } from '@skysmack/ng-packages';
import { Field } from '@skysmack/ng-ui';


export interface EntityFieldsConfig<TObject, TKey> {
    getStaticFields(loadedPackage: LoadedPackage, entity?: LocalObject<TObject, TKey>): Field[];
    getFields(loadedPackage: LoadedPackage, entity?: LocalObject<TObject, TKey>, fields?: LocalObject<FieldSchemaViewModel, string>[]): Field[];
}

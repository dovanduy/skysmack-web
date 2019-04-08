import { FormHelper, FormRule, Field } from '@skysmack/ng-ui';
import { Observable } from 'rxjs';

export interface DynamicField {
    fh: FormHelper;
    fieldKey: string;
    field: Field;
    fields: Field[];
    rules: FormRule[];
}
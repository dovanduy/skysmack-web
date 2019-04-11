import { FormHelper, FormRule, Field } from '@skysmack/ng-ui';

export interface DynamicField {
    fh: FormHelper;
    fieldKey: string;
    field: Field;
    fields: Field[];
    rules: FormRule[];
}
import { FormHelper } from '../forms/form-helper';
import { Field } from './field';
import { FormRule } from '../rules/form-rule';

export interface DynamicField {
    fh: FormHelper;
    fieldKey: string;
    field: Field;
    fields: Field[];
    rules: FormRule[];
}
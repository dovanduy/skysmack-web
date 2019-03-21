import { ValidatorFn } from '@angular/forms';
import { FieldTypes } from './field-types';

export class Field {
    /**
     * Key (property) e.g. "firstName"
     */
    public key: string;

    // TODO(GET_DEPS): This is new - is it still relevant when the other parts of the system is implemented?
    /**
     * DisplayKey (property) e.g. "assignmentType" (to replace the actual key)
     */
    public displayKey: string;

    /**
     * Modifies how the field value will be displayed in the column.
     */
    public displayModifier: Function;

    /**
     * Form label e.g. "First Name"
     */
    public label = '';

    /**
     * Decides when this field should be shown. 1 comes first, 2 seconds, etc.
     */
    public order: number;

    /**
     * Field validations, if any.
     */
    public validators: ValidatorFn[];

    /**
     * Default value e.g. "John"
     */
    public value?: any;

    /**
     * Field type e.g. datetime field, select field, etc.
     */
    public fieldType: FieldTypes;

    /**
     * Placeholder content e.g. "Write your first name here, please"
     */
    public placeholder = '';

    /**
     * Set to false. Field is shown, but disabled for input.
     */
    public disabled = false;

    /**
     * Whether the data table should show  this field as a column
     */
    public showColumn = false;

    /**
     * Whether this field is dynamically created (e.g. not a static field).
     */
    public dynamicField = false;

    constructor(values: Partial<Field>) {
        Object.assign(this, values);
    }
}

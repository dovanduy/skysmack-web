import { ValidatorFn } from '@angular/forms';
import { FieldTypes } from './field-types';
import { Type } from '@angular/core';
import { DisplayColumn, LocalObject } from '@skysmack/framework';

export class Field {
    /**
     * Key (property) e.g. "firstName"
     */
    public key: string;

    /**
     * DisplayKey (property) e.g. "assignmentType" (to replace the actual key)
     */
    public displayKey: string;

    /**
     * If displayKey points to a property containing an object,
     * the displaySubKey lets you specify a path to the prop you want to display.
     * E.g. displayKey points to "LocalObject<AssignmentType, number>", then specify "object.description" to display
     * the description.
     */
    public displaySubKey: string;

    /**
     * Modifies how the field value will be displayed in the column.
     */
    public displayModifier: (column: DisplayColumn, providedEntity: LocalObject<any, any>) => string;

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
    public fieldType: FieldTypes = FieldTypes.undefined;

    /**
     * The field component used to render this field.
     */
    public component: Type<any>;

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

    /**
     * Validation errors returned from the backend
     */
    public errors: string[];

    /**
     * Whether the field should be included in the form or not.
     * Used when you want to display the field on index, but not in editor.
     */
    public includeInForm = true;

    /**
     * Whether the value should be included in the data set sent to the backend
     * Used to display a value in the form, but prevent it from being sent.
     * Best used with disabled = true, so it isn't shown in the data preview.
     */
    public includeInRequest = true;

    /**
     * Whether the field should be sortable on the index page.
     */
    public sortable = false;

    /**
     * A function containing redux action calls to ensure relevant data is retrieved.
     */
    public getDependencies: Function;

    /**
     * Permissions required to be able to view a field
     */
    public permissions: string[] = [];

    constructor(values: Partial<Field>) {
        Object.assign(this, values);
    }
}

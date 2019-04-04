import { Field } from './field';
import { SelectFieldOption } from './select-field-option';
import { FieldHelpers } from './field-helpers';
import { Observable, pipe, UnaryFunction } from 'rxjs';
import { map } from 'rxjs/operators';

type OptionsDataType = 'array' | 'enum' | 'ts-enum';
const DEFAULT_VALUE_SELECTOR = 'object.id';
const DEFAULT_DISPLAY_NAME_SELECTOR = 'object.name';
const DEFAULT_OPTIONS_DATA_TYPE = 'array';

export class SelectField extends Field {

    /**
     * A stream of values
     */
    public optionsData$: Observable<any>;

    /**
     * Specifies the type optionsData is.
     */
    public optionsDataType: OptionsDataType;
    /**
     * Any additional options for the select field not auto generated.
     */
    public extraOptions?: SelectFieldOption[];

    /**
     * Selector for what value in the data object gets set to the form.
     * Default is 'object.id'
     */
    public valueSelector: string;
    /**
     * Selector for what value in the data object gets used as display name in the list.
     * Default is 'object.name'
     */
    public displayNameSelector: string;

    /**
     * Value used for select fields where you can select between single and multiple values.
     */
    public selectType: 'single' | 'multiple' = 'single';

    public modifyDisplayName?: Function;

    constructor(values: Partial<SelectField>) {
        super(values);
        this.optionsDataType = DEFAULT_OPTIONS_DATA_TYPE;
        this.valueSelector = DEFAULT_VALUE_SELECTOR;
        this.displayNameSelector = DEFAULT_DISPLAY_NAME_SELECTOR;
        Object.assign(this, values);
        this.optionsData$ = this.optionsData$.pipe(this.dataToOptions());
    }

    /**
     * Converts the options data from an array or enum into a SelectFieldOption e.g. { value: 23, displayName: 'Age' }
     * @param optionsData An array or enum
     */
    public dataToOptions = (): UnaryFunction<any, any> => pipe(
        map((optionsData: any) => {
            let options: SelectFieldOption[];

            switch (this.optionsDataType) {
                case 'array': options = FieldHelpers.getFieldOptionsOfArray(optionsData, this.valueSelector, this.displayNameSelector); break;
                case 'enum': options = FieldHelpers.getFieldOptionsOfEnum(optionsData); break;
                case 'ts-enum': options = FieldHelpers.getFieldOptionsOfEnum(optionsData, true); break;
                default: options = []; break;
            }

            return this.modifyDisplayName ? this.modifyDisplayName(options) : options;
        })
    )
}

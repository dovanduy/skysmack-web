import { FormRule } from '../form-rule';
import { Field } from 'lib/portal-ui/fields/field';

/**
 * Currently implemented for SelectField (used with adaptors)
 */
export class DisableUntilValueRule extends FormRule {
    public static type = 'DisableUntilValueRule';
    public type = DisableUntilValueRule.type;

    /**
     * Used to check if any of the rules in a form is of this type
     */
    public disableUntilValueRule = null;

    constructor(
        public keys: string[],
        public selectionField: string,
        public disabledUntilSelectionField: string
    ) { super(keys); }

    protected rule(dependencies: { fields: Field[] }) {
        const controls = this.getDefaultGroupControls();
        const selectionFieldControl = controls[this.selectionField];
        const disabledUntilSelectionFieldControl = controls[this.disabledUntilSelectionField];

        // We don't fiddle with the control if it is set to be disabled from the start.
        if (!this.getField(dependencies.fields, this.disabledUntilSelectionField).disabled) {
            selectionFieldControl.value ? disabledUntilSelectionFieldControl.enable({ emitEvent: false }) : disabledUntilSelectionFieldControl.disable({ emitEvent: false });
        }
    }
}

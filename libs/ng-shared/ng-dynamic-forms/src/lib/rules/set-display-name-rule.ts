import { FormRule } from './form-rule';

export class SetDisplayNameRule extends FormRule {
    protected rule() {
        const controls = this.getDefaultGroupControls();
        const firstNameControl = controls['firstName'];
        const lastNameControl = controls['lastName'];
        const displayNameControl = controls['displayName'];

        const firstName = firstNameControl.value ? firstNameControl.value.trim() : '';
        const lastName = lastNameControl.value ? lastNameControl.value.trim() : '';
        const displayName = displayNameControl.value ? displayNameControl.value.trim() : '';
        if (displayName.length <= 0 && firstName !== '' && lastName !== '') {
            displayNameControl.setValue(firstName + ' ' + lastName);
        }
    }
}

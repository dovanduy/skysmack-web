import { FormRule } from '../form-rule';

export class SetFieldKeyRule extends FormRule {
    protected rule() {
        const controls = this.getDefaultGroupControls();
        const displayControl = controls['display'];
        const keyControl = controls['key'];

        const display = displayControl.value ? displayControl.value.trim() : '';
        const key = keyControl.value ? keyControl.value.trim() : '';
        if (key.length <= 0 && display !== '') {
            // https://stackoverflow.com/questions/8485027/javascript-url-safe-filename-safe-string
            keyControl.setValue(display.replace(/[^a-z0-9\-]/gi, '').toLowerCase());
        }
    }
}

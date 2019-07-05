import { FormRule } from './form-rule';

export class SetPathRule extends FormRule {
    protected rule() {
        const controls = this.getDefaultGroupControls();
        const nameControl = controls['name'];
        const pathControl = controls['path'];

        const name = nameControl.value ? nameControl.value.trim() : '';
        const path = pathControl.value ? pathControl.value.trim() : '';
        if (path.length <= 0 && name !== '' && name !== '') {
            // https://stackoverflow.com/questions/8485027/javascript-url-safe-filename-safe-string
            pathControl.setValue(name.replace(/[^a-z0-9\-]/gi, '_').toLowerCase());
        }
    }
}

import { FormRule } from '../form-rule';

export class SetUrlRule extends FormRule {
    protected rule() {
        const controls = this.getDefaultGroupControls();
        const nameControl = controls['name'];
        const urlControl = controls['url'];

        const name = nameControl.value ? nameControl.value.trim() : '';
        const url = urlControl.value ? urlControl.value.trim() : '';
        if (url.length <= 0 && name !== '' && name !== '') {
            // https://stackoverflow.com/questions/8485027/javascript-url-safe-filename-safe-string
            urlControl.setValue(name.replace(/[^a-z0-9]/gi, '_').toLowerCase());
        }
    }
}

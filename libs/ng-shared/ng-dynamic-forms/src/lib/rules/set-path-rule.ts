import { FormRule } from './form-rule';
import * as latinize from 'latinize';

latinize.characters['Æ'] = 'AE';
latinize.characters['æ'] = 'ae';
latinize.characters['Ø'] = 'OE';
latinize.characters['ø'] = 'oe';
latinize.characters['Å'] = 'AA';
latinize.characters['å'] = 'aa';

export class SetPathRule extends FormRule {
    protected rule() {
        const controls = this.getDefaultGroupControls();
        const nameControl = controls['name'];
        const pathControl = controls['path'];

        const name = nameControl.value ? nameControl.value.trim() : '';
        const path = pathControl.value ? pathControl.value.trim() : '';
        if (path.length <= 0 && name !== '' && name !== '') {

            // https://stackoverflow.com/questions/8485027/javascript-url-safe-filename-safe-string
            pathControl.setValue(latinize(name).replace(/[^a-z0-9\-]/gi, '-').toLowerCase());
        }
    }
}

import { FormRule } from './form-rule';
import * as _moment from 'moment';
const moment = _moment;

export class AddDaysRule extends FormRule {
    constructor(
        public keys: string[],
        public firstDateFieldKey: string,
        public secondDateFieldKey: string,
        public dateType: 'date' | 'dateTime',
        public daysToAdd: number
    ) { super(keys); }

    protected rule() {
        const controls = this.getDefaultGroupControls();
        const firstDateFieldControl = controls[this.firstDateFieldKey];
        const secondDateFieldFieldControl = controls[this.secondDateFieldKey];

        let firstDateValue = firstDateFieldControl.value;
        if (typeof firstDateValue === 'string') {
            if (/\/Date\((\d*)\)\//.exec(firstDateValue)) {
                firstDateValue = new Date(firstDateValue);
            } else {
                firstDateValue = moment(firstDateValue).toDate();
            }
        }

        let secondDateValue = secondDateFieldFieldControl.value;
        if (typeof secondDateValue === 'string') {
            if (/\/Date\((\d*)\)\//.exec(secondDateValue)) {
                secondDateValue = new Date(secondDateValue);
            } else {
                secondDateValue = moment(secondDateValue).toDate();
            }
        }

        if (firstDateValue > secondDateValue) {
            secondDateValue.setFullYear(firstDateValue.getFullYear(), firstDateValue.getMonth(), firstDateValue.getDate() + this.daysToAdd);
            secondDateFieldFieldControl.setValue(secondDateValue);
        }
    }
}

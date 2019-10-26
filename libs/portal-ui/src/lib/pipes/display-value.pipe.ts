import { Pipe, PipeTransform } from '@angular/core';
import { DisplayColumn, getProperty } from '@skysmack/framework';
import * as _moment from 'moment';
const moment = _moment;

@Pipe({ name: 'displayValue' })
export class DisplayValuePipe implements PipeTransform {
    transform(entity: any, column: DisplayColumn) {
        let myValue = entity;
        if (column.fieldDisplaySubKey) {
            myValue = getProperty(entity, column.fieldDisplaySubKey, false);
        }

        var dateFormats = [
            moment.ISO_8601,
            "YYYY-MM-DD'T'HH:mm:ss"
        ];

        if (typeof myValue === 'string') {
            if (/\/Date\((\d*)\)\//.exec(myValue)) {
                myValue = new Date(myValue);
            } else if (moment(myValue, dateFormats, true).isValid()) {
                myValue = moment(myValue, dateFormats).toDate();
            }
        }

        if (myValue instanceof Date) {
            return moment(myValue).format('DD-MM-YYYY HH:mm');
        }

        return myValue;
    }
}

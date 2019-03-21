import { Pipe, PipeTransform } from '@angular/core';
import { LocalObject, DisplayColumn, getProperty } from '@skysmack/framework';

@Pipe({ name: 'displayValue' })
export class DisplayValuePipe implements PipeTransform {
    transform(entity: LocalObject<any, any>, column: DisplayColumn) {
        const key = column.fieldDisplayKey ? column.fieldDisplayKey : column.fieldKey;
        const displayValue = getProperty(entity, 'object.' + key, false);
        if (column.fieldKey === 'status') {
            console.log(displayValue);
        }
        return column.displayModifier ? column.displayModifier(displayValue) : displayValue;
    }
}

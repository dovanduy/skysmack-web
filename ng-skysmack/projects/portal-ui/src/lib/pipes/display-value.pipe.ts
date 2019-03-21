import { Pipe, PipeTransform } from '@angular/core';
import { DisplayColumn, getProperty } from '@skysmack/framework';

@Pipe({ name: 'displayValue' })
export class DisplayValuePipe implements PipeTransform {
    transform(entity: any, column: DisplayColumn) {
        if (column.fieldDisplaySubKey) {
            return getProperty(entity, column.fieldDisplaySubKey, false);
        }
        return entity;
    }
}

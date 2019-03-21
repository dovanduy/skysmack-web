import { Pipe, PipeTransform } from '@angular/core';
import { LocalObject, DisplayColumn, getProperty } from '@skysmack/framework';

@Pipe({ name: 'displayValue', pure: false })
export class DisplayValuePipe implements PipeTransform {
    transform(entity: LocalObject<any, any>, column: DisplayColumn) {
        const key = column.fieldDisplayKey ? column.fieldDisplayKey : column.fieldKey;
        return getProperty(entity, 'object.' + key, false);
    }
}

@Pipe({ name: 'displayModifier' })
export class DisplayModifierPipe implements PipeTransform {
    transform(displayValue: any, column: DisplayColumn) {
        return column.displayModifier ? column.displayModifier(displayValue) : displayValue;
    }
}

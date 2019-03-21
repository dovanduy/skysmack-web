import { Pipe, PipeTransform } from '@angular/core';
import { DisplayColumn } from '@skysmack/framework';

@Pipe({ name: 'displayModifier' })
export class DisplayModifierPipe implements PipeTransform {
    transform(displayValue: any, column: DisplayColumn) {
        return column.displayModifier ? column.displayModifier(displayValue) : displayValue;
    }
}

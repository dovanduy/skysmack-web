import { Pipe, PipeTransform } from '@angular/core';
import { DisplayColumn, LocalObject } from '@skysmack/framework';

@Pipe({ name: 'displayModifier' })
export class DisplayModifierPipe implements PipeTransform {
    transform(displayValue: any, column: DisplayColumn, entity: LocalObject<any, any>) {
        return column.displayModifier ? column.displayModifier(column, entity) : displayValue;
    }
}

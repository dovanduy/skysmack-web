import { Output, EventEmitter } from '@angular/core';

export class ExpressionValues {
    @Output() public selectedValues: EventEmitter<{}> = new EventEmitter();

    public emitValues(values: any) {
        this.selectedValues.emit(values);
    }
}

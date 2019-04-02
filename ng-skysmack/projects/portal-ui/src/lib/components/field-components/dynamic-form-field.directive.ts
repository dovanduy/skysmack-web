import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[dynamic-form-field]',
})
export class DynamicFormFieldDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}

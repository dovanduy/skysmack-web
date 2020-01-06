import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[dynamic-summary]',
})
export class DynamicSummaryDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}

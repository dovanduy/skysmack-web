import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[dynamic-dashboard]',
})
export class DynamicDashboardDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}

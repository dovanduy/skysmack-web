import { Directive, Input, OnInit, ElementRef, Renderer } from '@angular/core';
import { EntityAction } from '../models/entity-action';
import { LocalObject } from '@skysmack/framework';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[showEntityAction]'
})
export class ShowEntityActionDirective implements OnInit {
    @Input() entityAction: EntityAction;
    @Input() entity: LocalObject<any, any>;

    constructor(public el: ElementRef, public renderer: Renderer) {
    }

    ngOnInit() {
        if (!this.entityAction.runShowLogic(this.entity)) {
            this.renderer.setElementStyle(this.el.nativeElement, 'display', 'none');
        }
    }
}

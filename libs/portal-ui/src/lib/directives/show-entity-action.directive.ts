import { Directive, Input, OnInit, ElementRef, Renderer } from '@angular/core';
import { LocalObject } from '@skysmack/framework';
import { EntityAction } from '@skysmack/ng-ui';

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
        // console.log('updating entity action show status');
        if (!this.entityAction.runShowLogic(this.entity)) {
            this.renderer.setElementStyle(this.el.nativeElement, 'display', 'none');
        }
    }
}

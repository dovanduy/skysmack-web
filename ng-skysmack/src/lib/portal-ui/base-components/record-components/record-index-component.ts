import { BaseComponent } from '../base-component';
import { Router, ActivatedRoute } from '@angular/router';
import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { NgSkysmackRedux } from 'lib/ng-packages/skysmack';

export class RecordIndexComponent extends BaseComponent {
    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public actions: RecordActionsBase<NgRedux<any>>,
        public redux: NgSkysmackRedux
    ) {
        super(router, activatedRoute, actions, redux);
    }
}

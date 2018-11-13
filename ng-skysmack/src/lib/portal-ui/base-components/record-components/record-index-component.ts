import { BaseComponent } from '../base-component';
import { Router, ActivatedRoute } from '@angular/router';
import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { NgRecordReduxStore } from 'lib/ng-redux/redux-stores/ng-record-redux-store';

export class RecordIndexComponent extends BaseComponent {
    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public actions: RecordActionsBase<NgRedux<any>>,
        public redux: NgRecordReduxStore<any, any, any>
    ) {
        super(router, activatedRoute, actions, redux);
    }
}

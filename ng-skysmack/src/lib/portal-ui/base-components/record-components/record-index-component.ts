import { BaseComponent } from '../base-component';
import { Router, ActivatedRoute } from '@angular/router';
import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { NgSkysmackRedux } from 'lib/ng-packages/skysmack';
import { LocalObject } from '@skysmack/framework';
import { Observable } from 'rxjs';

export class RecordIndexComponent<TRecord> extends BaseComponent {
    public entities$: Observable<LocalObject<TRecord>[]>;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public actions: RecordActionsBase<any, NgRedux<any>>,
        public redux: NgSkysmackRedux
    ) {
        super(router, activatedRoute, actions, redux);
    }
}

import { Router, ActivatedRoute } from '@angular/router';
import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { NgSkysmackRedux } from 'lib/ng-packages/skysmack';
import { RecordIndexComponent } from './record-index-component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalPage } from '@skysmack/framework';

export class RecordPagedIndexComponent<TRecord, TKey> extends RecordIndexComponent<TRecord> {

    public pages$: BehaviorSubject<LocalPage<TKey>[]> = new BehaviorSubject<LocalPage<TKey>[]>([]);

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public actions: RecordActionsBase<any, NgRedux<any>>,
        public redux: NgSkysmackRedux
    ) {
        super(router, activatedRoute, actions, redux);
    }
}

import { Router, ActivatedRoute } from '@angular/router';
import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { NgSkysmackRedux } from 'lib/ng-packages/skysmack';
import { RecordIndexComponent } from './record-index-component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalPage } from '@skysmack/framework';

export class RecordPagedIndexComponent<TAppState, TRecord, TKey> extends RecordIndexComponent<TAppState, TRecord, TKey> {

    public pages$: BehaviorSubject<LocalPage<TKey>[]> = new BehaviorSubject<LocalPage<TKey>[]>([]);

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public actions: RecordActionsBase<TAppState, NgRedux<TAppState>>,
        public redux: NgSkysmackRedux
    ) {
        super(router, activatedRoute, actions, redux);
    }
}

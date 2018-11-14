import { SubscriptionHandler, PagedQuery } from '@skysmack/framework';
import { Package, NgSkysmackRedux } from 'lib/ng-packages/skysmack';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, OnDestroy } from '@angular/core';
import { take } from 'rxjs/operators';
import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';

export class BaseComponent implements OnInit, OnDestroy {
    public subscriptionHandler = new SubscriptionHandler();

    public entityId: any;
    public path: string;
    public package$: Observable<Package>;
    public pagedQuery = new PagedQuery();

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public actions: RecordActionsBase<any, NgRedux<any>>,
        public redux: NgSkysmackRedux
    ) { }

    ngOnInit() {
        // Used together with dynamic routing in fallback component.
        this.router.onSameUrlNavigation = 'ignore';
        this.getParams();
        this.getCurrentPackage();
        this.subscriptionHandler.unsubscribe();
    }

    ngOnDestroy() {
        this.subscriptionHandler.unsubscribe();
    }

    public getParams() {
        this.path = this.router.url.split('/')[1];
        if (this.entityId === undefined) {
            if (this.activatedRoute) {
                this.subscriptionHandler.subscribe(this.activatedRoute.params
                    .pipe(take(1))
                    .subscribe(params => {
                        if (params['id']) {
                            this.entityId = params['id'];
                            // Fields have a "key" as id. Set to id if present.
                        } else if (params['key']) {
                            this.entityId = params['key'];
                        }
                    }));
            }
        }
    }

    public getCurrentPackage() {
        this.package$ = this.redux.getCurrentPackage(this.path);
    }

    public redirect(path: string) {
        this.router.navigate([path]);
    }
}

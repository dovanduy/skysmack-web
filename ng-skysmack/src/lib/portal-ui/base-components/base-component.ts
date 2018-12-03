import { SubscriptionHandler } from '@skysmack/framework';
import { Package, NgSkysmackRedux } from 'lib/ng-packages/skysmack';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, OnDestroy } from '@angular/core';
import { take } from 'rxjs/operators';
import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';

export class BaseComponent<TAppState, TKey> implements OnInit, OnDestroy {
    public subscriptionHandler = new SubscriptionHandler();

    public entityId: TKey;
    public packagePath: string;
    public package$: Observable<Package>;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public actions: RecordActionsBase<TAppState, NgRedux<TAppState>>,
        public redux: NgSkysmackRedux
    ) { }

    ngOnInit() {
        // Used together with dynamic routing in fallback component.
        this.router.onSameUrlNavigation = 'ignore';
        this.getParams();
        this.getCurrentPackage();
    }

    ngOnDestroy() {
        this.subscriptionHandler.unsubscribe();
    }

    public redirect(path: string) {
        this.router.navigate([path]);
    }

    private getParams() {
        this.packagePath = this.router.url.split('/')[1];
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

    private getCurrentPackage() {
        this.package$ = this.redux.getCurrentPackage(this.packagePath);
    }
}

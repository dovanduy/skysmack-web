import { SubscriptionHandler } from '@skysmack/framework';
import { LoadedPackage, NgSkysmackStore } from 'lib/ng-packages/skysmack';
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
    public loadedPackage$: Observable<LoadedPackage>;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public actions: RecordActionsBase<TAppState, NgRedux<TAppState>>,
        public redux: NgSkysmackStore
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
                this.subscriptionHandler.register(this.activatedRoute.params
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
        this.loadedPackage$ = this.redux.getCurrentPackage(this.packagePath);
    }
}

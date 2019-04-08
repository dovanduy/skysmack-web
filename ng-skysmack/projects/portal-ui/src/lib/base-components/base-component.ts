import { SubscriptionHandler } from '@skysmack/framework';
import { LoadedPackage, NgSkysmackStore } from '@skysmack/ng-packages';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, OnDestroy } from '@angular/core';
import { take } from 'rxjs/operators';
import { Field } from '@skysmack/ng-ui';
import { getAdditionalPaths } from '@skysmack/ng-redux';

export class BaseComponent<TAppState, TKey> implements OnInit, OnDestroy {
    public subscriptionHandler = new SubscriptionHandler();
    public fields$: Observable<Field[]>;
    public entityId: TKey;
    public packagePath: string;
    public additionalPaths: string[] = [];
    public loadedPackage$: Observable<LoadedPackage>;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public skysmackStore: NgSkysmackStore
    ) { }

    ngOnInit() {
        // Used together with dynamic routing in fallback component.
        this.router.onSameUrlNavigation = 'ignore';
        this.setPackagePath();
        this.setAdditionalPaths();
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
        if (this.entityId === undefined) {
            if (this.activatedRoute) {
                this.subscriptionHandler.register(this.activatedRoute.params
                    .pipe(take(1))
                    .subscribe(params => {
                        if (params['id']) {
                            this.entityId = params['id'];
                        } else if (params['key']) {
                            // Fields have a "key" as id. Set to id if present.
                            this.entityId = params['key'];
                        }
                    })
                );
            }
        }
    }

    private getCurrentPackage() {
        this.loadedPackage$ = this.skysmackStore.getCurrentPackage(this.packagePath);
    }

    private setPackagePath() {
        this.packagePath = this.router.url.split('/')[1];
    }

    private setAdditionalPaths() {
        this.additionalPaths = getAdditionalPaths(this.router, this.packagePath);
    }
}

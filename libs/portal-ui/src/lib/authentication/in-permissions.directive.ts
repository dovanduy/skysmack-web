import { Directive, OnInit, TemplateRef, ViewContainerRef, OnDestroy, Input } from '@angular/core';
import { SubscriptionLike, combineLatest, of } from 'rxjs';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';


// tslint:disable-next-line:directive-selector
@Directive({ selector: '[inPermission]' })
export class InPermissionDirective implements OnInit, OnDestroy {
    public subscription: SubscriptionLike;

    constructor(
        public templateRef: TemplateRef<any>,
        public viewContainer: ViewContainerRef,
        public store: NgSkysmackStore,
        public router: Router
    ) { }

    private displaying = true;

    private _permissions: string[];
    @Input() set inPermission(permissions: string[] | string) {
        if (Array.isArray(permissions)) {
            this._permissions = permissions;
        } else {
            this._permissions = [permissions];
        }
    }

    private _showDefault = false;
    @Input() set inPermissionShowDefault(showDefault: boolean) {
        this._showDefault = showDefault;
    }

    ngOnInit() {
        if (this._permissions.length > 0) {
            if (!this._showDefault) {
                this.show(false);
            }
            const packagePath = this.router.url.split('/')[1];

            // Note: This doesn't need to be unsubscribed.
            this.subscription = this.store.getPermissions(packagePath).pipe(
                map(permissions => {
                    this.show(this.includesAll(this._permissions, permissions));
                })
            ).subscribe();
        }
    }

    private includesAll(permissions: string[], allPermissions: string[]): boolean {
        for (let index = 0; index < permissions.length; index++) {
            if (!allPermissions.includes(permissions[index])) {
                return false;
            }
        }
        return true;
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    private show(show: boolean = false) {
        if (show) {
            if (!this.displaying) {
                this.viewContainer.clear();
                this.viewContainer.createEmbeddedView(this.templateRef);
            }
            this.displaying = true;
        } else {
            if (this.displaying) {
                this.viewContainer.clear();
            }
            this.displaying = false;
        }
    }
}

import { Directive, OnInit, TemplateRef, ViewContainerRef, OnDestroy, Input } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


// tslint:disable-next-line:directive-selector
@Directive({ selector: '[inAnyPermission]' })
export class IsAnyPermissionDirective implements OnInit, OnDestroy {
    public subscription: SubscriptionLike;

    constructor(
        public templateRef: TemplateRef<any>,
        public viewContainer: ViewContainerRef,
        public store: NgSkysmackStore,
        public router: Router
    ) { }

    private displaying = true;

    private _permissions: string[];
    @Input() set inAnyPermission(permissions: string[] | string) {
        if (Array.isArray(permissions)) {
            this._permissions = permissions;
        } else {
            this._permissions = [permissions];
        }
    }

    private _showDefault = false;
    @Input() set inAnyPermissionShowDefault(showDefault: boolean) {
        this._showDefault = showDefault;
    }

    ngOnInit() {
        if (this._permissions.length > 0) {
            if (!this._showDefault) {
                this.show(false);
            }

            const packagePath = this.router.url.split('/')[1];
            this.subscription = this.store.getPermissions(packagePath).pipe(
                map(permissions => {
                    this.show(this.includesAny(this._permissions, permissions));
                })
            ).subscribe();
        }
    }

    private includesAny(permissions: string[], allPermissions: string[]): boolean {
        for (let index = 0; index < permissions.length; index++) {
            if (allPermissions.includes(permissions[index])) {
                return true;
            }
        }
        return false;
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

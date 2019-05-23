import { Directive, OnInit, TemplateRef, ViewContainerRef, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { NgSkysmackStore, NgSkysmackActions } from '@skysmack/ng-core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


// tslint:disable-next-line:directive-selector
@Directive({ selector: '[inAnyPermission]' })
export class IsAnyPermissionDirective implements OnInit, OnDestroy {
    public static register = {};
    public subscription: SubscriptionLike;
    private displaying = false;

    private _permissions: string[] = [];
    @Input() set inAnyPermission(permissions: string[] | string) {
        if (Array.isArray(permissions)) {
            this._permissions = permissions;
        } else if (permissions && permissions.length > 0) {
            this._permissions = [permissions];
        }
    }

    private _showDefault = false;
    @Input() set inAnyPermissionShowDefault(showDefault: boolean) {
        this._showDefault = showDefault;
    }

    @Output() public permissionsChecked = new EventEmitter();


    constructor(
        public templateRef: TemplateRef<any>,
        public viewContainer: ViewContainerRef,
        public skysmackStore: NgSkysmackStore,
        public skysmackActions: NgSkysmackActions,
        public router: Router
    ) { }

    ngOnInit() {
        if (this._permissions && this._permissions.length > 0) {
            if (this._showDefault) {
                this.show(true);
            }
            const packagePath = this.router.url.split('/')[1];
            this.getPermissions(packagePath);

            this.subscription = this.skysmackStore.getPermissions(packagePath).pipe(
                map(permissions => {
                    this.show(this.includesAny(this._permissions, permissions));
                    this.permissionsChecked.next(this.displaying);
                })
            ).subscribe();
        } else {
            this.viewContainer.createEmbeddedView(this.templateRef);
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

    private getPermissions(packagePath: string): void {
        if (!IsAnyPermissionDirective.register[packagePath]) {
            IsAnyPermissionDirective.register[packagePath] = true;
            this.skysmackActions.getPermissions(packagePath)
        }
    }
}

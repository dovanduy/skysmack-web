import { Directive, OnInit, TemplateRef, ViewContainerRef, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { NgAuthenticationStore } from '@skysmack/ng-framework';
import { map } from 'rxjs/operators';
import { SubscriptionHandler, AllowAccessFor } from '@skysmack/framework';

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[allowAccessFor]' })
export class AllowAccessForDirective implements OnInit, OnDestroy {

    public subscriptionHandler = new SubscriptionHandler();
    private displaying = false;

    private _allowAccessFor: AllowAccessFor;
    @Input() set allowAccessFor(allowAccessFor: AllowAccessFor) {
        this._allowAccessFor = allowAccessFor;
    }

    constructor(
        public templateRef: TemplateRef<any>,
        public viewContainer: ViewContainerRef,
        public store: NgAuthenticationStore
    ) { }

    ngOnInit() {
        // Timeout prevents ExpressionChanged error
        setTimeout(() => { this.setVisibility(); }, 0);
    }

    ngOnDestroy() {
        this.subscriptionHandler.unsubscribe();
    }

    private setVisibility() {
        switch (this._allowAccessFor) {
            case AllowAccessFor.anonymous: { this.showForAnonymous(); break; }
            case AllowAccessFor.authenticated: { this.showForAuthenticated(); break; }
            case AllowAccessFor.both: { this.showForBoth(); break; }
            default: { throw new Error(`\n\nPlease define who to give access: anonymous, authenticated, or both. E.g. [allowAccessFor]="allowAccessForEnum.authenticated"\n`); }
        }
    }

    private showForAnonymous() {
        this.subscriptionHandler.register(this.store.isCurrentUserAuthenticated().pipe(
            map(authenticated => authenticated ? this.show(false) : this.show(true))
        ).subscribe());
    }

    private showForAuthenticated() {
        this.subscriptionHandler.register(this.store.isCurrentUserAuthenticated().pipe(map(authenticated => {
            map(authenticated => authenticated ? this.show(true) : this.show(false))
        })).subscribe());
    }

    private showForBoth() {
        this.show(true);
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

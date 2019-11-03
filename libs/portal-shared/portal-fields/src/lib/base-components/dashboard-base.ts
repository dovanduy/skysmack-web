import { Dashboard, Package, SubscriptionHandler } from '@skysmack/framework';
import { Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { map } from 'rxjs/operators';

export abstract class DashboardBase implements OnInit {
    @Input() packagePath: string;
    @Input() dashboard: Dashboard;
    public package$: Observable<Package>;
    protected subscriptionHandler = new SubscriptionHandler();

    /**
     * Whether to show or hide the individual dashboard.
     */
    protected abstract show();

    /**
     * Whether to render the individual dashboard at all.
     * Cannot be "undone" if set to false (until after page reload).
     */
    protected abstract render();

    constructor(
        public skysmackStore: NgSkysmackStore
    ) { }

    ngOnInit() {
        this.package$ = this.skysmackStore.getCurrentPackage(this.packagePath).pipe(map(x => x._package));
    }

    ngOnDestroy() {
        this.subscriptionHandler.unsubscribe();
    }
}
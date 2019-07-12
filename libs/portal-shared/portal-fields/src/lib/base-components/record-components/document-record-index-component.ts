import { Router, ActivatedRoute } from '@angular/router';
import { EntityActions, EntityStore } from '@skysmack/redux';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { OnInit } from '@angular/core';
import { Record, PagedQuery } from '@skysmack/framework';
import { RecordIndexComponent } from './record-index-component';
import { NgFieldActions } from '@skysmack/ng-framework';
import { EntityFieldsConfig } from '@skysmack/ng-fields';
import { EntityComponentPageTitle } from '@skysmack/portal-ui';
import { MenuItemActionProviders } from '@skysmack/portal-ui';

export class DocumentRecordIndexComponent<TAppState, TRecord extends Record<TKey>, TKey> extends RecordIndexComponent<TAppState, TRecord, TKey> implements OnInit {

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public actions: EntityActions<any, TKey>,
        public redux: NgSkysmackStore,
        public store: EntityStore<any, TKey>,
        public fieldsConfig: EntityFieldsConfig<any, TKey>,
        public fieldActions: NgFieldActions,
        public menuItemActionProviders: MenuItemActionProviders,
        public title?: EntityComponentPageTitle,
    ) {
        super(router, activatedRoute, actions, redux, store, fieldsConfig, menuItemActionProviders, title);
    }

    ngOnInit() {
        super.ngOnInit();
        const fieldPagedQuery = new PagedQuery({});
        this.fieldActions.getPaged(this.packagePath, fieldPagedQuery, this.additionalPaths);
    }
}

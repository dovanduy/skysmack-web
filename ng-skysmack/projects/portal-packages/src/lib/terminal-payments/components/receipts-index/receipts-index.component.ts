import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, DocumentRecordIndexComponent } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore, NgReceiptsActions, NgReceiptsStore } from '@skysmack/ng-packages';
import { ReceiptsAppState, Receipt } from '@skysmack/packages-terminal-payments';
import { NgReceiptsMenu } from '../../ng-receipts-menu';
import { EntityAction } from '@skysmack/ng-ui';
import { NgFieldActions } from '@skysmack/ng-redux';
import { NgReceiptsFieldsConfig } from '../../ng-receipts-fields-config';

@Component({
  selector: 'ss-receipts-index',
  templateUrl: './receipts-index.component.html',
  styleUrls: ['./receipts-index.component.scss']
})
export class ReceiptsIndexComponent extends DocumentRecordIndexComponent<ReceiptsAppState, Receipt, number> implements OnInit {
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgReceiptsActions,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgReceiptsStore,
    public sidebarMenu: NgReceiptsMenu,
    public fieldsConfig: NgReceiptsFieldsConfig,
    public fieldActions: NgFieldActions
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, fieldActions);
  }


  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}

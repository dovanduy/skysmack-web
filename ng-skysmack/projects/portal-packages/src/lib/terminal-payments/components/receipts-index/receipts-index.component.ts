import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, DocumentRecordIndexComponent } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore, NgReceiptsActions, NgReceiptsStore, NgReceiptsFieldsConfig } from '@skysmack/ng-packages';
import { ReceiptsAppState, Receipt, RECEIPTS_REDUCER_AREA_KEY } from '@skysmack/packages-terminal-payments';
import { NgReceiptsMenu } from '../../ng-receipts-menu';
import { EntityAction } from '@skysmack/ng-ui';
import { NgFieldActions, NgFieldStore } from '@skysmack/ng-redux';


@Component({
  selector: 'ss-receipts-index',
  templateUrl: './receipts-index.component.html',
  styleUrls: ['./receipts-index.component.scss']
})
export class ReceiptsIndexComponent extends DocumentRecordIndexComponent<ReceiptsAppState, Receipt, number> implements OnInit {
  public area: string = RECEIPTS_REDUCER_AREA_KEY;
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
    public fieldActions: NgFieldActions,
    public fieldStore: NgFieldStore
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, fieldActions, fieldStore);
  }


  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}

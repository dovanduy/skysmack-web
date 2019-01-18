import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, DocumentRecordIndexComponet } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore, NgReceiptsActions, NgReceiptsStore } from '@skysmack/ng-packages';
import { ReceiptsAppState, Receipt } from '@skysmack/packages-terminal-payments';
import { NgReceiptsMenu } from '../../ng-receipts-menu';
import { EntityAction } from '@skysmack/ng-ui';


@Component({
  selector: 'ss-receipts-index',
  templateUrl: './receipts-index.component.html',
  styleUrls: ['./receipts-index.component.scss']
})
export class ReceiptsIndexComponent extends DocumentRecordIndexComponet<ReceiptsAppState, Receipt, number> implements OnInit {
  public displayedColumns = ['name'];
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
    public sidebarMenu: NgReceiptsMenu
  ) {
    super(router, activatedRoute, actions, redux, store);

  }

  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}

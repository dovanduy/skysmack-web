import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AssignmentTypesAppState, AssignmentType } from '@skysmack/packages-maintenance';
import { DocumentRecordIndexComponet, EntityComponentPageTitle } from '@skysmack/portal-ui';
import { EntityAction } from '@skysmack/ng-ui';
import { NgAssignmentTypesActions, NgSkysmackStore, NgAssignmentTypesStore } from '@skysmack/ng-packages';
import { NgAssignmentTypesMenu } from '../../ng-assignment-types-menu';


@Component({
  selector: 'ss-assignment-types-index',
  templateUrl: './assignment-types-index.component.html',
  styleUrls: ['./assignment-types-index.component.scss']
})
export class AssignmentTypesIndexComponent extends DocumentRecordIndexComponet<AssignmentTypesAppState, AssignmentType, number> implements OnInit {

  public displayedColumns = ['name'];
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgAssignmentTypesActions,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgAssignmentTypesStore,
    public sidebarMenu: NgAssignmentTypesMenu
  ) {
    super(router, activatedRoute, actions, redux, store);

  }

  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}

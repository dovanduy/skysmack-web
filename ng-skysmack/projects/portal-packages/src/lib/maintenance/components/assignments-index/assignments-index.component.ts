import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AssignmentsAppState } from '@skysmack/packages-maintenance/lib/redux/Assignments-reducer';
import { Assignment } from '@skysmack/packages-maintenance';
import { DocumentRecordIndexComponet, EntityComponentPageTitle } from '@skysmack/portal-ui';
import { EntityAction } from '@skysmack/ng-ui';
import { NgAssignmentsActions, NgSkysmackStore, NgAssignmentsStore, NgAssignmentsMenu } from '@skysmack/ng-packages';

@Component({
  selector: 'ss-assignments-index',
  templateUrl: './assignments-index.component.html',
  styleUrls: ['./assignments-index.component.scss']
})
export class AssignmentsIndexComponent extends DocumentRecordIndexComponet<AssignmentsAppState, Assignment, number> implements OnInit {

  public displayedColumns = ['name'];
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgAssignmentsActions,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgAssignmentsStore,
    public sidebarMenu: NgAssignmentsMenu
  ) {
    super(router, activatedRoute, actions, redux, store);

  }

  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}

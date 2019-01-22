import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AssignmentsAppState } from '@skysmack/packages-maintenance';
import { Assignment } from '@skysmack/packages-maintenance';
import { EntityComponentPageTitle, RecordIndexComponent } from '@skysmack/portal-ui';
import { EntityAction } from '@skysmack/ng-ui';
import { NgAssignmentsActions, NgSkysmackStore, NgAssignmentsStore } from '@skysmack/ng-packages';
import { NgAssignmentsMenu } from '../../ng-assignments-menu';

@Component({
  selector: 'ss-assignments-index',
  templateUrl: './assignments-index.component.html',
  styleUrls: ['./assignments-index.component.scss']
})
export class AssignmentsIndexComponent extends RecordIndexComponent<AssignmentsAppState, Assignment, number> implements OnInit {

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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityAction } from '@skysmack/ng-ui';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { EntityComponentPageTitle, ENTITY_ACTIONS_EDIT } from '@skysmack/portal-ui';
import { NgAssignmentAllMenu } from './../../ng-assignments-all-menu';

@Component({
  selector: 'ss-assignments-all',
  templateUrl: './assignments-all.component.html'
})
export class AssignmentsAllIndexComponent implements OnInit {

  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', ENTITY_ACTIONS_EDIT, 'edit'),
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public sidebarMenu: NgAssignmentAllMenu
  ) { }

  ngOnInit() {
    this.title.setTitle('MAINTENANCE.ASSIGNMENT_ALL.TITLE');
  }
}

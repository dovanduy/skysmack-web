import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityAction } from '@skysmack/ng-ui';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { EntityComponentPageTitle } from '@skysmack/portal-ui';
import { NgAssignmentAllMenu } from '../../ng-assignments-all-menu';

@Component({
  selector: 'ss-assignments-all',
  templateUrl: './assignments-all.component.html',
  styleUrls: ['./assignments-all.component.scss']
})
export class AssignmentsAllIndexComponent implements OnInit {

  public displayedColumns = ['name'];
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public sidebarMenu: NgAssignmentAllMenu
  ) { }

  ngOnInit() {
    this.title.setTitle('Assignments All');
  }
}

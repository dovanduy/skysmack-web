import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from '@skysmack/framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { EntityComponentPageTitle, MENU_ITEM_ACTIONS_EDIT } from '@skysmack/portal-ui';
import { NgAssignmentAllMenu } from './../../ng-assignments-all-menu';

@Component({
  selector: 'ss-assignments-all',
  templateUrl: './assignments-all.component.html'
})
export class AssignmentsAllIndexComponent implements OnInit {
  public static COMPONENT_KEY = 'assignments-all-index';
  public componentKey = AssignmentsAllIndexComponent.COMPONENT_KEY;

  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
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

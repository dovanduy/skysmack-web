import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from '@skysmack/framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { EntityComponentPageTitle, MENU_ITEM_ACTIONS_EDIT } from '@skysmack/portal-ui';
import { NgAssignmentsStore, NgAssignmentsActions } from '@skysmack/ng-maintenance';
import { map, tap } from 'rxjs/operators';

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
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private redux: NgSkysmackStore,
    private assignmentsStore: NgAssignmentsStore,
    private assignmentsActions: NgAssignmentsActions,
    private title: EntityComponentPageTitle
  ) { }

  ngOnInit() {
    this.title.setTitle('MAINTENANCE.ASSIGNMENT_ALL.TITLE');
    const packagePath = this.router.url.split('/')[1];
    const baseDate = new Date();
    const from = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() - 10);
    const to = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 10);
    // TODO: Implement correctly when backend works
    // this.assignmentsActions.get(packagePath, from, to);
    // this.assignmentsStore.get(packagePath).pipe(
    //   tap((x) => console.log(x)),
    // ).subscribe();
  }
}

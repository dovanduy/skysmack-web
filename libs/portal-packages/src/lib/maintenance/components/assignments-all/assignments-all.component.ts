import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, safeUndefinedTo, LocalObject } from '@skysmack/framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { EntityComponentPageTitle, MENU_ITEM_ACTIONS_EDIT } from '@skysmack/portal-ui';
import { NgAssignmentsStore, NgAssignmentsActions } from '@skysmack/ng-maintenance';
import { Field } from '@skysmack/ng-dynamic-forms';
import { Observable } from 'rxjs';
import { DateOnlyAdapter2 } from './date-only-adapter2';
import { DateAdapter } from '@angular/material/core';
import { take, tap, map } from 'rxjs/operators';
import { Assignment } from 'libs/packages/maintenance/src';

@Component({
  selector: 'ss-assignments-all',
  templateUrl: './assignments-all.component.html',
  styleUrls: ['./assignments-all.component.scss'],
  providers: [DateOnlyAdapter2, { provide: DateAdapter, useClass: DateOnlyAdapter2 }]
})
export class AssignmentsAllIndexComponent implements OnInit {
  public static COMPONENT_KEY = 'assignments-all-index';
  public componentKey = AssignmentsAllIndexComponent.COMPONENT_KEY;
  public entities$: Observable<LocalObject<Assignment, unknown>[]>;
  private from: Date;
  private due: Date;
  private packagePath: string;

  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private redux: NgSkysmackStore,
    private assignmentsStore: NgAssignmentsStore,
    private assignmentsActions: NgAssignmentsActions,
    private title: EntityComponentPageTitle,
  ) { }

  ngOnInit() {
    this.title.setTitle('MAINTENANCE.ASSIGNMENT_ALL.TITLE');
    this.packagePath = this.router.url.split('/')[1];

    this.entities$ = this.assignmentsStore.get(this.packagePath).pipe(
      map(x => x[`${this.from}:${this.due}`]),
      safeUndefinedTo('array'),
    );
  }

  public setFromDate(currentValue: string): void {
    this.from = new Date(currentValue);
  }

  public setDueDate(currentValue: string): void {
    this.due = new Date(currentValue);
  }

  public getAssignments(): void {
    this.assignmentsActions.get(this.packagePath, this.from, this.due);
  }

  public trackByLocalId(index: any, item: LocalObject<any, any>) {
    return item ? item.localId : undefined;
  }
}

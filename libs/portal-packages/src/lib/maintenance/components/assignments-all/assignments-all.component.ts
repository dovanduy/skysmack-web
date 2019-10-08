import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from '@skysmack/framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { EntityComponentPageTitle, MENU_ITEM_ACTIONS_EDIT } from '@skysmack/portal-ui';
import { NgAssignmentsStore, NgAssignmentsActions } from '@skysmack/ng-maintenance';
import { NgFromToFieldsConfig } from './ng-from-to-fields-config';
import { Field } from '@skysmack/ng-dynamic-forms';
import { Observable } from 'rxjs';
import { DateOnlyAdapter2 } from './date-only-adapter2';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'ss-assignments-all',
  templateUrl: './assignments-all.component.html',
  styleUrls: ['./assignments-all.component.scss'],
  providers: [DateOnlyAdapter2, { provide: DateAdapter, useClass: DateOnlyAdapter2 }]
})
export class AssignmentsAllIndexComponent implements OnInit {
  public static COMPONENT_KEY = 'assignments-all-index';
  public componentKey = AssignmentsAllIndexComponent.COMPONENT_KEY;
  public fields$: Observable<Field[]>
  private from: Date;
  private to: Date;
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
    private fieldsConfig: NgFromToFieldsConfig
  ) { }

  ngOnInit() {
    this.title.setTitle('MAINTENANCE.ASSIGNMENT_ALL.TITLE');
    this.packagePath = this.router.url.split('/')[1];

    // this.fields$ = this.fieldsConfig.getFields(undefined, undefined);
    // TODO: Implement correctly when backend works
    // this.assignmentsStore.get(packagePath).pipe(
    //   tap((x) => console.log(x)),
    // ).subscribe();
  }

  public setFromDate(currentValue: string): void {
    this.from = new Date(currentValue);
  }

  public setToDate(currentValue: string): void {
    this.to = new Date(currentValue);
  }

  public getAssignments(): void {
    console.log(this.from, this.to);
    this.assignmentsActions.get(this.packagePath, this.from, this.to);
  }
}

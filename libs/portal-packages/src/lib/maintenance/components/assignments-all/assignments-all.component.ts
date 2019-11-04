import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, safeUndefinedTo, LocalObject, SubscriptionHandler, toLocalObject } from '@skysmack/framework';
import { EntityComponentPageTitle } from '@skysmack/portal-ui';
import { NgAssignmentsStore, NgAssignmentsActions, NgSingleAssignmentsActions, NgAssignmentsSchedulesActions, NgAssignmentsSchedulesStore, NgSingleAssignmentsStore } from '@skysmack/ng-maintenance';
import { Observable } from 'rxjs';
import { DateOnlyAdapter2 } from './date-only-adapter2';
import { DateAdapter } from '@angular/material/core';
import { map, take, tap } from 'rxjs/operators';
import { Assignment, AssignmentStatus, ScheduledAssignment, ScheduledAssignmentKey, AssignmentKey } from '@skysmack/packages-maintenance';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'ss-assignments-all',
  templateUrl: './assignments-all.component.html',
  styleUrls: ['./assignments-all.component.scss'],
  providers: [DateOnlyAdapter2, { provide: DateAdapter, useClass: DateOnlyAdapter2 }]
})
export class AssignmentsAllIndexComponent implements OnInit, OnDestroy {
  public static COMPONENT_KEY = 'assignments-all-index';
  public componentKey = AssignmentsAllIndexComponent.COMPONENT_KEY;
  public entities$: Observable<LocalObject<Assignment, AssignmentKey>[]>;
  public from: Date;
  public due: Date;
  private packagePath: string;
  private translationPrefix = 'MAINTENANCE.ASSIGNMENT_ALL.MENU_ITEM_ACTIONS.';
  private subscriptionHandler = new SubscriptionHandler();

  public menuItemActions: MenuItem[] = [
    new MenuItem().asEventAction(`${this.translationPrefix}CREATED`, () => AssignmentStatus.Created, '', this).setShowLogic((entity: LocalObject<Assignment, AssignmentKey>) => {
      return entity.object.status !== AssignmentStatus.Created;
    }),
    new MenuItem().asEventAction(`${this.translationPrefix}PENDING`, () => AssignmentStatus.Pending, '', this).setShowLogic((entity: LocalObject<Assignment, AssignmentKey>) => {
      return entity.object.status !== AssignmentStatus.Pending;
    }),
    new MenuItem().asEventAction(`${this.translationPrefix}ONGOING`, () => AssignmentStatus.Ongoing, '', this).setShowLogic((entity: LocalObject<Assignment, AssignmentKey>) => {
      return entity.object.status !== AssignmentStatus.Ongoing;
    }),
    new MenuItem().asEventAction(`${this.translationPrefix}DONE`, () => AssignmentStatus.Done, '', this).setShowLogic((entity: LocalObject<Assignment, AssignmentKey>) => {
      return entity.object.status !== AssignmentStatus.Done;
    }),
    new MenuItem().asEventAction(`${this.translationPrefix}CANCELED`, () => AssignmentStatus.Canceled, '', this).setShowLogic((entity: LocalObject<Assignment, AssignmentKey>) => {
      return entity.object.status !== AssignmentStatus.Canceled;
    }),
    new MenuItem().asEventAction(`${this.translationPrefix}FAULTED`, () => AssignmentStatus.Faulted, '', this).setShowLogic((entity: LocalObject<Assignment, AssignmentKey>) => {
      return entity.object.status !== AssignmentStatus.Faulted;
    })
  ];

  constructor(
    private router: Router,
    private assignmentsStore: NgAssignmentsStore,
    private assignmentsActions: NgAssignmentsActions,
    private singleAssignmentsActions: NgSingleAssignmentsActions,
    private singleAssignmentsStore: NgSingleAssignmentsStore,
    private assignmentsScheduledActions: NgAssignmentsSchedulesActions,
    private assignmentsScheduledStore: NgAssignmentsSchedulesStore,
    private title: EntityComponentPageTitle,
  ) { }

  ngOnInit() {
    this.title.setTitle('MAINTENANCE.ASSIGNMENT_ALL.TITLE');
    this.packagePath = this.router.url.split('/')[1];
    this.initDates();
    this.getAssignments();
    this.entities$ = this.assignmentsStore.get(this.packagePath).pipe(
      map(entities => entities.filter(entity => {
        return moment(entity.object.from).isAfter(this.from, 'day') && moment(entity.object.due).isSameOrBefore(this.due, 'day');
      }))
    );
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
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

  public updateStatus(event: { action: () => AssignmentStatus, _this: AssignmentsAllIndexComponent, value?: LocalObject<Assignment, AssignmentKey> }): void {
    const assignment: Assignment = event.value && event.value.object;
    const status: AssignmentStatus = event.action();
    const _this = event._this;
    if (assignment && assignment.id.originalTime) {
      // Updated scheduled assignment
      const change = toLocalObject<ScheduledAssignment, ScheduledAssignmentKey>(new ScheduledAssignment({
        id: {
          scheduleId: assignment.id.id,
          originalTime: assignment.id.originalTime
        },
        originalTime: assignment.id.originalTime,
        description: assignment.description,
        status,
        due: assignment.due,
        from: assignment.from
      }));
      _this.assignmentsScheduledActions.changes(_this.packagePath, [change]);
    } else if (assignment) {
      // Updated single assignment
      _this.singleAssignmentsActions.getSingle(_this.packagePath, assignment.id.id);
      this.subscriptionHandler.register(_this.singleAssignmentsStore.getSingle(_this.packagePath, assignment.id.id).pipe(
        take(1),
        tap((singleAssignment) => {
          singleAssignment.object.status = status;
          _this.singleAssignmentsActions.update([singleAssignment], _this.packagePath);
        })
      ).subscribe());
    } else {
      // Something went wrong...
    }
  }

  private trackById(index: number, item: LocalObject<Assignment, number>) {
    return item.object.id;
  }

  private initDates(): void {
    this.from = new Date();
    this.due = new Date();
    this.due.setDate(this.from.getDate() + 1);
  }
}

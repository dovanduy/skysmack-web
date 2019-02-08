import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { LocalObject, LoadingState, SubscriptionHandler } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { MenuItem } from '@skysmack/ng-ui/lib/models/sidebar-menu/menu-item';
import { EntityAction } from '@skysmack/ng-ui';

@Component({
  selector: 'ss-records-container',
  templateUrl: './records-container.component.html',
  styleUrls: ['./records-container.component.scss']
})
export class RecordsContainerComponent implements OnInit {

  // Input properties defined in the task
  @Input() public entities$: Observable<LocalObject<any, any>[]>;
  @Input() public totalCount: number;
  @Input() public loadingState: LoadingState;
  @Input() public entityActions: EntityAction[] = [];

  // Output properties defined in the task
  @Output() public loadNext = new EventEmitter<boolean>(); // Is the emit type correct?
  @Output() public sort = new EventEmitter<string>(); // Is the emit type correct? Could be PagedQuery
  @Output() public filter = new EventEmitter<string>(); // Is the emit type correct? Could be PagedQuery

  // Properties taken from Data table
  @Input() public packagePath: string;
  @Input() public title: string;
  @Input() public cancelAction: Function;
  @Input() public displayedColumns: string[] = [];
  @Output() public delete = new EventEmitter<LocalObject<any, any>>();
  public subscriptionHandler = new SubscriptionHandler();

  constructor() { }

  ngOnInit() {
  }

  public deleteEntity(entity: LocalObject<any, any>) {
    this.delete.emit(entity);
  }

  public runCancelAction(entity: LocalObject<any, any>) {
    this.cancelAction(entity, this.packagePath);
  }

}

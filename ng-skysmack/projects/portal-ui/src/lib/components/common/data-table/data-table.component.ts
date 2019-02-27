import { Component, OnInit, ViewChild, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalObject, SubscriptionHandler, MenuItem } from '@skysmack/framework';

import { EditorNavService } from '../container/editor-nav.service';
import { EntityAction } from '@skysmack/ng-ui';
import { EntityComponentPageTitle } from './../../../models/entity-component-page-title';

@Component({
  selector: 'ss-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnDestroy, OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Note entities are the paged entities.
   */
  @Input() public entities$: Observable<LocalObject<any, any>[]>;
  @Input() public cancelAction: Function;
  @Input() public title: string;
  @Input() public displayedColumns: string[] = [];
  @Input() public displayActions = true;
  @Input() public displayCheckboxes = false;
  @Input() public entityActions: MenuItem[] | EntityAction[] = [];

  // Input needed for cancel action
  @Input() public packagePath: string;

  public allColumns: string[] = [];
  public subscriptionHandler = new SubscriptionHandler();
  public dataSource$: Observable<MatTableDataSource<LocalObject<any, any>>>;

  @Output() public delete = new EventEmitter<LocalObject<any, any>>();
  @Output() public entityActionEvent = new EventEmitter<any>();

  constructor(
    public editorNavService: EditorNavService,
    public componentPageTitle: EntityComponentPageTitle,
  ) { }

  ngOnInit() {
    this.initColumns();
    this.componentPageTitle.setTitle(this.title);
    this.editorNavService.hideEditorNav();
    this.initDataSource();
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  public trackByLocalId(item: LocalObject<any, any>) {
    return item ? item.localId : undefined;
  }

  public initColumns() {
    if (this.displayCheckboxes) {
      this.allColumns.push('checkboxes');
    }
    this.allColumns = this.allColumns.concat(this.displayedColumns);
    if (this.displayActions) {
      this.allColumns.push('actions');
    }
  }

  public deleteEntity(entity: LocalObject<any, any>) {
    this.delete.emit(entity);
  }

  public runCancelAction(entity: LocalObject<any, any>) {
    this.cancelAction(entity, this.packagePath);
  }

  private initDataSource() {
    if (this.entities$) {
      this.dataSource$ = this.entities$.pipe(
        map(entities => {
          const dataSource = new MatTableDataSource(entities);
          dataSource.sort = this.sort;
          return dataSource;
        }),
      );
    } else {
      this.dataSource$ = of(new MatTableDataSource([]));
    }
  }
}

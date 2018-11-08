import { Component, OnInit, ViewChild, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { LocalObject, SubscriptionHandler, EntityComponentPageTitle, BaseRedux, EntityAction } from 'framework';
import { Observable, of } from 'rxjs';
import { EditorNavService } from 'ui/components/container/editor-nav.service';
import { MenuItem } from 'ui/models/sidebar-menu/menu-item';
import { map } from 'rxjs/operators';

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
  @Input() public redux: BaseRedux;
  @Input() public entities$: Observable<LocalObject<any>[]>;
  @Input() public title: string;
  @Input() public displayedColumns: string[] = [];
  @Input() public displayActions = true;
  @Input() public displayCheckboxes = false;
  @Input() public showDelete = false;
  @Input() public entityActions: MenuItem[] | EntityAction[] = [];

  // Input needed for cancel action
  @Input() public path: string;

  @Input() public compareValue = 'localId';
  @Input() public target: 'entities' | 'fields' = 'entities';

  public allColumns: string[] = [];
  public subscriptionHandler = new SubscriptionHandler();
  public dataSource$: Observable<MatTableDataSource<LocalObject<any>>>;

  @Output() public delete = new EventEmitter<LocalObject<any>>();
  @Output() public entityActionEvent = new EventEmitter<any>();

  constructor(
    public editorNavService: EditorNavService,
    public componentPageTitle: EntityComponentPageTitle,
  ) { }

  // TODO: Infinite scroll
  // https://github.com/angular/material2/issues/9858
  ngOnInit() {
    this.initColumns();
    this.componentPageTitle.setTitle(this.title);
    this.editorNavService.hideEditorNav();
    this.initDataSource();

  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
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

  public deleteEntity(entity: LocalObject<any>) {
    this.delete.emit(entity);
  }

  public cancelAction(entity: LocalObject<any>) {
    this.redux.cancelAction(entity, this.redux.config.area, this.path, this.compareValue, this.target);
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

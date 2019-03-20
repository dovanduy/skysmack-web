import { Component, OnInit, Input, OnDestroy, EventEmitter, Output, ViewChild } from '@angular/core';
import { LocalObject, LoadingState, SubscriptionHandler, DisplayColumn, EnumHelpers, cloneLocalObject, getProperty } from '@skysmack/framework';
import { Observable, of } from 'rxjs';
import { EntityAction, Field, FieldTypes } from '@skysmack/ng-ui';
import { map, switchMap } from 'rxjs/operators';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Assignment } from '@skysmack/packages-maintenance';

@Component({
  selector: 'ss-records-container',
  templateUrl: './records-container.component.html',
  styleUrls: ['./records-container.component.scss']
})
export class RecordsContainerComponent implements OnInit, OnDestroy {
  public subscriptionHandler: SubscriptionHandler = new SubscriptionHandler();
  public loadedEntitiesCount: number;

  @ViewChild('entityList') public entityList: CdkVirtualScrollViewport;

  @Output() public requestPage = new EventEmitter<boolean>(false);
  @Output() public entityActionEvent = new EventEmitter<any>();
  @Output() public sortChanged = new EventEmitter<DisplayColumn>();

  @Input() public entities$: Observable<LocalObject<any, any>[]>;
  @Input() public entities: LocalObject<any, any>[];
  @Input() public totalCount: number;
  @Input() public loadingState: LoadingState;
  @Input() public entityActions: EntityAction[] = [];
  @Input() public packagePath: string;
  @Input() public additionalPaths?: string[];
  @Input() public title: string;
  @Input() public cancelAction: Function;
  @Input() public fields$: Observable<Field[]>;
  @Input() public area: string;

  // TODO(GET_DEPS): Remove this when getDeps epics work. Also see below todo.
  @Input() public modifyLocalObject: Function;

  public displayColumns: DisplayColumn[];

  constructor() { }

  public getProperty = getProperty;

  ngOnInit() {
    // Set display columns
    this.subscriptionHandler.register(this.fields$.subscribe(fields => {
      this.displayColumns = fields.map(field => this.displayColumnFromField(field)).filter(column => column.show);
    }));

    // Set entities
    this.subscriptionHandler.register(this.entities$.pipe(
      // TODO(GET_DEPS): See above todo.
      switchMap(entities => this.modifyLocalObject ? this.modifyLocalObject(entities) : of(entities)),
      map((entities: LocalObject<any, any>[]) => {
        this.entities = entities;
        this.loadedEntitiesCount = entities.length;
      })).subscribe());
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  public displayColumnFromField(field: Field) {
    const foundColumn = this.displayColumns ? this.displayColumns.find(column => column.fieldKey === field.key) : undefined;
    if (!foundColumn) {
      const sortableFields: Array<FieldTypes> = [FieldTypes.int, FieldTypes.dateTime, FieldTypes.decimal, FieldTypes.double, FieldTypes.limitedString];
      const sortable = sortableFields.indexOf(field.fieldType) > -1 || !field.dynamicField;
      const column = new DisplayColumn({
        fieldKey: field.key,
        fieldDisplayKey: field.displayKey ? field.displayKey : field.key,
        dynamicFieldName: field.dynamicField ? field.label : undefined,
        translationString: this.area.toUpperCase() + '.FORM.LABELS.' + field.key.toUpperCase(),
        show: field.showColumn,
        sortable: sortable
      });
      return column;
    } else {
      return foundColumn;
    }
  }

  public runCancelAction(entity: LocalObject<any, any>) {
    this.additionalPaths ? this.cancelAction(entity, this.packagePath, this.additionalPaths) : this.cancelAction(entity, this.packagePath);
  }

  public trackByLocalId(item: LocalObject<any, any>) {
    return item ? item.localId : undefined;
  }

  public whenScrolling() {
    if (this.entityList.measureScrollOffset('bottom') < 150) {
      this.requestPage.emit(true);
    }
  }

  public setSortOrder(displayColumn: DisplayColumn) {
    if (displayColumn.sortable) {
      this.entityList.scrollToIndex(0);
      switch (displayColumn.sortOrder) {
        case true: {
          displayColumn.sortOrder = false;
          break;
        }
        case false: {
          displayColumn.sortOrder = undefined;
          break;
        }
        default: {
          displayColumn.sortOrder = true;
          break;
        }
      }
      this.sortChanged.emit(displayColumn);
    }
  }
}

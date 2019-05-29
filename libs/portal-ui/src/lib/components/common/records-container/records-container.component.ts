import { Component, OnInit, Input, EventEmitter, Output, ViewChild, OnDestroy } from '@angular/core';
import { LocalObject, LoadingState, DisplayColumn, SubscriptionHandler } from '@skysmack/framework';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { EntityAction, Field, FieldTypes } from '@skysmack/ng-ui';
import { map, delay } from 'rxjs/operators';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'ss-records-container',
  templateUrl: './records-container.component.html',
  styleUrls: ['./records-container.component.scss']
})
export class RecordsContainerComponent implements OnInit, OnDestroy {

  public loadedEntitiesCount$: BehaviorSubject<number> = new BehaviorSubject(0).pipe(delay(0)) as BehaviorSubject<number>;
  public loadedEntitiesCount: number;

  @ViewChild('entityList') public entityList: CdkVirtualScrollViewport;

  @Output() public requestPage = new EventEmitter<boolean>(false);
  @Output() public entityActionEvent = new EventEmitter<any>();
  @Output() public sortChanged = new EventEmitter<DisplayColumn>();

  @Input() public entities$: Observable<LocalObject<any, any>[]>;
  @Input() public entityActions$: BehaviorSubject<EntityAction[]>;
  @Input() public fields$: Observable<Field[]>;
  @Input() public totalCount$: BehaviorSubject<number>;
  public totalCount: number;
  @Input() public loadingState$: BehaviorSubject<LoadingState>;
  public loadingState: LoadingState;
  @Input() public packagePath: string;
  @Input() public additionalPaths?: string[];
  @Input() public title: string;
  @Input() public cancelAction: Function;
  @Input() public area: string;

  public displayColumns$: Observable<DisplayColumn[]>;
  public subscriptionHandler = new SubscriptionHandler();

  constructor() { }

  ngOnInit() {
    // Set display columns
    this.displayColumns$ = this.fields$.pipe(
      map(fields => fields.map(field => this.displayColumnFromField(field)).filter(column => column.show)),
    );

    // Set entities
    this.entities$ = this.entities$.pipe(
      map((entities: LocalObject<any, any>[]) => {
        if (entities) {
          this.loadedEntitiesCount$.next(entities.length);
        }
        return entities;
      }));

    // This is done to avoid ExpressionHasChanged error
    this.subscriptionHandler.register(combineLatest(
      this.loadingState$,
      this.totalCount$,
      this.loadedEntitiesCount$
    ).pipe(
      delay(0),
      map(values => {
        this.loadingState = values[0];
        this.totalCount = values[1];
        this.loadedEntitiesCount = values[2];
      })).subscribe());
  }

  ngOnDestroy(): void {
    this.subscriptionHandler.unsubscribe();
  }

  public displayColumnFromField(field: Field) {
    const column = new DisplayColumn({
      fieldKey: field.key,
      fieldDisplayKey: field.displayKey ? field.displayKey : field.key,
      fieldDisplaySubKey: field.displaySubKey,
      dynamicFieldName: field.dynamicField ? field.label : undefined,
      displayModifier: field.displayModifier,
      translationString: this.area.toUpperCase() + '.FORM.LABELS.' + field.key.toUpperCase(),
      show: field.showColumn,
      sortable: field.sortable
    });

    if (field.dynamicField) {
      const sortableFields: Array<FieldTypes> = [FieldTypes.int, FieldTypes.dateTime, FieldTypes.decimal, FieldTypes.double, FieldTypes.limitedString];
      field.sortable = sortableFields.indexOf(field.fieldType) > -1 || !field.dynamicField;
    }

    return column;
  }

  public runCancelAction(entity: LocalObject<any, any>) {
    this.additionalPaths ? this.cancelAction(entity, this.packagePath, this.additionalPaths) : this.cancelAction(entity, this.packagePath);
  }

  public trackByLocalId(index: any, item: LocalObject<any, any>) {
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

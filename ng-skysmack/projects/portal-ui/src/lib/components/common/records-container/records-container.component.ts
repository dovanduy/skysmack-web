import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { LocalObject, LoadingState, DisplayColumn, getProperty } from '@skysmack/framework';
import { Observable, BehaviorSubject } from 'rxjs';
import { EntityAction, Field, FieldTypes } from '@skysmack/ng-ui';
import { map } from 'rxjs/operators';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'ss-records-container',
  templateUrl: './records-container.component.html',
  styleUrls: ['./records-container.component.scss']
})
export class RecordsContainerComponent implements OnInit {
  public loadedEntitiesCount: number;

  @ViewChild('entityList') public entityList: CdkVirtualScrollViewport;

  @Output() public requestPage = new EventEmitter<boolean>(false);
  @Output() public entityActionEvent = new EventEmitter<any>();
  @Output() public sortChanged = new EventEmitter<DisplayColumn>();

  @Input() public entities$: Observable<LocalObject<any, any>[]>;
  @Input() public fields$: Observable<Field[]>;
  @Input() public totalCount$: BehaviorSubject<number>;
  @Input() public loadingState$: BehaviorSubject<LoadingState>;
  @Input() public entityActions: EntityAction[] = [];
  @Input() public packagePath: string;
  @Input() public additionalPaths?: string[];
  @Input() public title: string;
  @Input() public cancelAction: Function;
  @Input() public area: string;

  public displayColumns$: Observable<DisplayColumn[]>;

  constructor() { }

  public getProperty = getProperty;

  ngOnInit() {
    // Set display columns
    this.displayColumns$ = this.fields$.pipe(
      map(fields => fields.map(field => this.displayColumnFromField(field)).filter(column => column.show)),
    );

    // Set entities
    this.entities$ = this.entities$.pipe(
      map((entities: LocalObject<any, any>[]) => {
        this.loadedEntitiesCount = entities.length;
        return entities;
      }));
  }

  public displayColumnFromField(field: Field) {
    const sortableFields: Array<FieldTypes> = [FieldTypes.int, FieldTypes.dateTime, FieldTypes.decimal, FieldTypes.double, FieldTypes.limitedString];
    const sortable = sortableFields.indexOf(field.fieldType) > -1 || !field.dynamicField;
    const column = new DisplayColumn({
      fieldKey: field.key,
      fieldDisplayKey: field.displayKey ? field.displayKey : field.key,
      fieldDisplaySubKey: field.displaySubKey,
      dynamicFieldName: field.dynamicField ? field.label : undefined,
      displayModifier: field.displayModifier,
      translationString: this.area.toUpperCase() + '.FORM.LABELS.' + field.key.toUpperCase(),
      show: field.showColumn,
      sortable: sortable
    });
    return column;
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

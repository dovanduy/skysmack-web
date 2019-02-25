import { Component, OnInit, Input, OnDestroy, EventEmitter, Output, ViewChild } from '@angular/core';
import { LocalObject, LoadingState, SubscriptionHandler, DisplayColumn } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { EntityAction, Field } from '@skysmack/ng-ui';
import { map } from 'rxjs/operators';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

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
  @Input() public entities$: Observable<LocalObject<any, any>[]>;
  @Input() public entities: LocalObject<any, any>[];
  @Input() public totalCount: number;
  @Input() public loadingState: LoadingState;
  @Input() public entityActions: EntityAction[] = [];

  // Properties taken from Data table
  @Input() public packagePath: string;
  @Input() public title: string;
  @Input() public cancelAction: Function;
  @Input() public fields: Field[];
  public displayColumns: DisplayColumn[];

  constructor() { }

  ngOnInit() {
    // Set display columns
    this.displayColumns = this.fields.map(field => this.displayColumnFromField(field)).filter(column => column.show);

    // Set entities
    this.subscriptionHandler.register(this.entities$.pipe(
      map(entities => {
        this.entities = entities;
        this.loadedEntitiesCount = entities.length;
      })).subscribe());
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  public displayColumnFromField(field: Field) {
    return new DisplayColumn({
      fieldKey: field.key,
      translationString: 'PERSONS.FORM.LABELS.' + field.key.toUpperCase(),
      show: field.showColumn
    });
  }

  public runCancelAction(entity: LocalObject<any, any>) {
    this.cancelAction(entity, this.packagePath);
  }

  public trackByLocalId(item: LocalObject<any, any>) {
    return item ? item.localId : undefined;
  }

  public whenScrolling() {
    if (this.entityList.measureScrollOffset('bottom') < 150) {
      this.requestPage.emit(true);
    }
  }
}

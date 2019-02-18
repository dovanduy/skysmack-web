import { Component, OnInit, Input, OnDestroy, EventEmitter, Output, ViewChild } from '@angular/core';
import { LocalObject, LoadingState, SubscriptionHandler } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { EntityAction } from '@skysmack/ng-ui';
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
  @Input() public entities$: Observable<LocalObject<any, any>[]>;
  @Input() public entities: LocalObject<any, any>[];
  @Input() public totalCount: number;
  @Input() public loadingState: LoadingState;
  @Input() public entityActions: EntityAction[] = [];

  // Properties taken from Data table
  @Input() public packagePath: string;
  @Input() public title: string;
  @Input() public cancelAction: Function;
  @Input() public displayedColumns: string[] = [];

  constructor() { }

  ngOnInit() {
    this.subscriptionHandler.register(this.entities$.pipe(
      map(entities => {
        this.entities = entities;
        this.loadedEntitiesCount = entities.length;
      })).subscribe());
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
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

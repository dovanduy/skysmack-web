import { Component, OnInit, Input, EventEmitter, Output, ViewChild, OnDestroy } from '@angular/core';
import { LocalObject, LoadingState, SubscriptionHandler } from '@skysmack/framework';
import { Observable, BehaviorSubject } from 'rxjs';
import { EntityAction } from '@skysmack/ng-ui';
import { CdkVirtualScrollViewport, ViewportRuler, CdkVirtualForOf } from '@angular/cdk/scrolling';

@Component({
  selector: 'ss-records-container',
  templateUrl: './records-container.component.html',
  styleUrls: ['./records-container.component.scss']
})
export class RecordsContainerComponent implements OnInit, OnDestroy {
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  @ViewChild('entitiesList') entitiesList: any;
  public entitiesLoaded: number;

  // Input properties defined in the task
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
  public subscriptionHandler: SubscriptionHandler = new SubscriptionHandler();

  constructor() { }

  ngOnInit() {
    this.subscriptionHandler.register(this.entities$.subscribe(entities => this.entities = entities));
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

  public whenScrolling(height: number) {
    const element = document.querySelector('#entity-list');
  }

}

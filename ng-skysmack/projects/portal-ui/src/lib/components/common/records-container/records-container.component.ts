import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { LocalObject, LoadingState, SubscriptionHandler } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { EntityAction } from '@skysmack/ng-ui';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ss-records-container',
  templateUrl: './records-container.component.html',
  styleUrls: ['./records-container.component.scss']
})
export class RecordsContainerComponent implements OnInit, OnDestroy {
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  @ViewChild('entitiesList') entitiesList: any;
  public showingRange: string = '0';

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
    this.subscriptionHandler.register(this.entities$.pipe(
      map(x => {
        this.getShowingRange();
        return x;
      })).subscribe(entities => this.entities = entities));
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
    this.getShowingRange();
  }

  private getShowingRange() {
    const element: Element = document.querySelector('#entity-list');
    if (element) {
      const currentVisibleEntities = Array.from(element.children[0].children);
      if (currentVisibleEntities[0] && currentVisibleEntities[currentVisibleEntities.length - 1]) {
        const lowest = Number(currentVisibleEntities[0].getAttribute('data-index')) + 1;
        const highest = Number(currentVisibleEntities[currentVisibleEntities.length - 1].getAttribute('data-index')) + 1;
        this.showingRange = `${lowest} - ${highest}`;
      }
    }
  }

}

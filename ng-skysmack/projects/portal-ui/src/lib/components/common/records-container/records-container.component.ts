import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { LocalObject, LoadingState } from '@skysmack/framework';
import { Observable, BehaviorSubject } from 'rxjs';
import { EntityAction } from '@skysmack/ng-ui';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'ss-records-container',
  templateUrl: './records-container.component.html',
  styleUrls: ['./records-container.component.scss']
})
export class RecordsContainerComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  // public offset = new BehaviorSubject(null);

  // Input properties defined in the task
  @Input() public entities$: Observable<LocalObject<any, any>[]>;
  @Input() public entities: LocalObject<any, any>[];
  @Input() public totalCount: number;
  @Input() public loadingState: LoadingState;
  @Input() public entityActions: EntityAction[] = [];

  // Output properties defined in the task
  // @Output() public loadNext = new EventEmitter<boolean>(); // Is the emit type correct?
  // @Output() public sort = new EventEmitter<any>();
  // @Output() public filter = new EventEmitter<any>();

  // Properties taken from Data table
  @Input() public packagePath: string;
  @Input() public title: string;
  @Input() public cancelAction: Function;
  @Input() public displayedColumns: string[] = [];
  // public subscriptionHandler = new SubscriptionHandler();

  constructor() { }

  ngOnInit() {
    this.entities$.subscribe(entities => this.entities = entities);
    // console.log('entities: ' + this.entities$ + '\n\n', 'totalCount: ' + this.totalCount + '\n\n', 'loadingState: ' + this.loadingState + '\n\n', 'entityActions: ' + this.entityActions + '\n\n', 'loadNext: ' + this.loadNext + '\n\n');
    // console.log('packagePath: ' + this.packagePath + '\n\n', 'title: ' + this.title + '\n\n', 'cancelAction: ' + this.cancelAction + '\n\n', 'displayedColumns: ' + this.displayedColumns + '\n\n');
  }

  public runCancelAction(entity: LocalObject<any, any>) {
    this.cancelAction(entity, this.packagePath);
  }

  public trackByLocalId(item: LocalObject<any, any>) {
    return item ? item.localId : undefined;
  }

  public loadNext(height: number) {
    // if (this.theEnd) {
    //   return;
    // }

    console.log(height);

    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    // console.log(offset);
    console.log(`${end}, '>=', ${total}`);
    if (end === total) {
      // this.offset.next(offset);
    }
  }

}

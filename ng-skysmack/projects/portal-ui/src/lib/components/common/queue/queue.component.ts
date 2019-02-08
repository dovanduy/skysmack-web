import { Component, OnInit } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { Observable } from 'rxjs';
import { QueueItem, log, LocalObjectStatus } from '@skysmack/framework';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { QueuesAppState, QueueActions } from '@skysmack/redux';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ss-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {

  public queue$: Observable<QueueItem[]>;

  constructor(
    public skysmackStore: NgSkysmackStore,
    public ngRedux: NgRedux<any>,
    public router: Router
  ) { }

  ngOnInit() {
    this.queue$ = this.ngRedux.select((state: QueuesAppState) => state.queue).pipe(
      map(queue => queue.items)
    );
  }

  public toEditor(queueItem: QueueItem) {
    queueItem.localObject.error = false;
    queueItem.localObject.status = LocalObjectStatus.OK;
    this.ngRedux.dispatch({
      type: QueueActions.REMOVE_QUEUE_ITEMS,
      payload: [queueItem]
    });
    this.skysmackStore.setEditorItem(queueItem.localObject);
    this.router.navigate([queueItem.link]);
  }

  public retryDelete(queueItem: QueueItem) {
    queueItem.localObject.error = false;
    queueItem.localObject.status = LocalObjectStatus.DELETING;
    queueItem.deleteAction([queueItem.localObject], queueItem.packagePath);
  }
}

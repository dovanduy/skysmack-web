import { Component, OnInit } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { Observable } from 'rxjs';
import { QueueItem, LocalObjectStatus, OfflineState, reinstantiateLocalRecord } from '@skysmack/framework';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { QueuesAppState, QueueActions, createDeleteAction } from '@skysmack/redux';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ss-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {

  public queue$: Observable<QueueItem[]>;
  public retrySchedule$: Observable<boolean>;
  public offline$: Observable<OfflineState>;

  constructor(
    public skysmackStore: NgSkysmackStore,
    public ngRedux: NgRedux<any>,
    public router: Router
  ) { }

  ngOnInit() {
    this.queue$ = this.ngRedux.select((state: QueuesAppState) => state.queue).pipe(
      map(queue => queue.items)
    );
    this.offline$ = this.skysmackStore.getOffline();
  }

  public toEditor(queueItem: QueueItem) {
    queueItem.localObject.error = false;
    queueItem.localObject.isNew = false;
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
    const { path, packagePath, actionType, prefix, records, messageParams } = queueItem.deleteAction;

    // This becomes serialized in state, making local object lose it's methods.
    // Reinstantiate here to restore methods.
    const reints = records.map(record => reinstantiateLocalRecord(record));

    const deleteAction = createDeleteAction(path, packagePath, actionType, prefix, reints as any, messageParams);
    this.ngRedux.dispatch(Object.assign({}, deleteAction));
  }

  public cancelAction(item: QueueItem) {
    this.ngRedux.dispatch(Object.assign({}, item.cancelAction));
  }
}

import { Component, OnInit } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { Observable } from 'rxjs';
import { QueueItem, log } from '@skysmack/framework';
import { Router } from '@angular/router';

@Component({
  selector: 'ss-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {

  public queue$: Observable<QueueItem[]>;

  constructor(
    public skysmackStore: NgSkysmackStore,
    public router: Router
  ) { }

  ngOnInit() {
    this.queue$ = this.skysmackStore.getOfflineQueueItems();
  }

  public toEditor(queueItem: QueueItem) {
    this.skysmackStore.setEditorItem(queueItem.localObject);
    this.router.navigate([queueItem.link]);
  }

}

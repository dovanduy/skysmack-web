import { Component, OnInit } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { Observable, of } from 'rxjs';
import { LocalObjectStatus, toLocalObject, LocalObject } from '@skysmack/framework';
import { Person } from '@skysmack/packages-persons';
import { Router } from '@angular/router';

class QueueItem {
  public message: string;
  public link?: string;
  public status: LocalObjectStatus;
  public localObject: LocalObject<any, any>;
  constructor(values: Partial<QueueItem>) {
    Object.assign(this, values);
  }
}

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
    this.queue$ = of([
      new QueueItem({
        message: `Creating person 'John Doe'`,
        status: LocalObjectStatus.CREATING,
        localObject: toLocalObject(new Person({
          firstName: 'John',
          lastName: 'Doe',
          displayName: 'John Doe'
        }))
      }),
      new QueueItem({
        message: `Error while creating person 'Jane Doe'. Click to retry.`,
        status: LocalObjectStatus.ERROR,
        link: 'employees/create',
        localObject: toLocalObject(new Person({
          firstName: 'Jane',
          lastName: 'Doe',
          displayName: 'Jane Doe'
        }))
      })
    ]);
    // this.queue$ = this.skysmackStore.getOfflineQueue();
  }

  public toEditor(queueItem: QueueItem) {
    this.skysmackStore.editorItem.next(queueItem.localObject);
    this.router.navigate([queueItem.link]);
  }

}

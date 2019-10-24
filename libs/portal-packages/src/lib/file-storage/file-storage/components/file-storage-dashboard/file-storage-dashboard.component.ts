import { Component, OnInit } from '@angular/core';
import { NgFileStorageActions, NgFileStorageStore } from '@skysmack/ng-file-storage';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { DashboardBase } from '@skysmack/portal-fields';
import { Observable } from 'rxjs';

@Component({
  selector: 'ss-file-storage-dashboard',
  templateUrl: './file-storage-dashboard.component.html',
  styleUrls: ['./file-storage-dashboard.component.scss']
})
export class FileStorageDashboardComponent extends DashboardBase implements OnInit {
  public elevation = 0;
  public totalCount$: Observable<number>;

  constructor(
    public actions: NgFileStorageActions,
    public store: NgFileStorageStore,
    public skysmackStore: NgSkysmackStore
  ) { super(skysmackStore); }

  ngOnInit() {
    super.ngOnInit();
    this.show();
    this.render();
  }

  public show(): void {
    setTimeout(() => {
      this.dashboard.show$.next(true);
    }, 0);
  }

  public render(): void {
    setTimeout(() => {
      this.dashboard.render$.next(true);
    }, 0);
  }

  public changeStyle($event) {
    this.elevation = $event.type == 'mouseover' ? 4 : 0;
  }
}

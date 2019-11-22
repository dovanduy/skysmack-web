import { Component, OnInit } from '@angular/core';
import { NgPassCodesActions, NgPassCodesStore } from '@skysmack/ng-pass-codes';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { Observable } from 'rxjs';
import { PagedQuery } from '@skysmack/framework';
import { map } from 'rxjs/operators';
import { DashboardBase } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-pass-codes-dashboard',
  templateUrl: './pass-codes-dashboard.component.html',
  styleUrls: ['./pass-codes-dashboard.component.scss']
})
export class PassCodesDashboardComponent extends DashboardBase implements OnInit {
  public elevation = 0;
  public totalCount$: Observable<number>;

  constructor(
    public actions: NgPassCodesActions,
    public store: NgPassCodesStore,
    public skysmackStore: NgSkysmackStore
  ) { super(skysmackStore); }

  ngOnInit() {
    super.ngOnInit();
    this.getPassCodesCount();
    this.show();
    this.render();
  }

  private getPassCodesCount() {
    this.package$ = this.skysmackStore.getCurrentPackage(this.packagePath).pipe(map(x => x._package));
    this.actions.getPaged(this.packagePath, new PagedQuery());
    this.totalCount$ = this.store.getPages(this.packagePath).pipe(map(pages => {
      let totalCount = 0;
      Object.keys(pages).forEach(key => {
        totalCount = pages[key].totalCount;
      });
      return totalCount;
    }));
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

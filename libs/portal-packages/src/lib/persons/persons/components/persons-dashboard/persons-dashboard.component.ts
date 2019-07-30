import { Component, OnInit } from '@angular/core';
import { NgPersonsActions, NgPersonsStore } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { Observable } from 'rxjs';
import { PagedQuery } from '@skysmack/framework';
import { map } from 'rxjs/operators';
import { DashboardBase } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-persons-dashboard',
  templateUrl: './persons-dashboard.component.html',
  styleUrls: ['./persons-dashboard.component.scss']
})
export class PersonsDashboardComponent extends DashboardBase implements OnInit {

  public totalCount$: Observable<number>;

  constructor(
    public actions: NgPersonsActions,
    public store: NgPersonsStore,
    public skysmackStore: NgSkysmackStore
  ) { super(skysmackStore); }

  ngOnInit() {
    super.ngOnInit();
    this.getPersonsCount();
    this.show();
    this.render();
  }

  private getPersonsCount() {
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
}

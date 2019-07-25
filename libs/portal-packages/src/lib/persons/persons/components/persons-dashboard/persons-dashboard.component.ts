import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { NgPersonsActions, NgPersonsStore } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Package, PagedQuery, Visible, Dashboard } from '@skysmack/framework';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ss-persons-dashboard',
  templateUrl: './persons-dashboard.component.html',
  styleUrls: ['./persons-dashboard.component.scss']
})
export class PersonsDashboardComponent implements OnInit, Visible {
  @Input() packagePath: string;
  @Input() dashboard: Dashboard;
  public package$: Observable<Package>;
  public totalCount$: Observable<number>;

  constructor(
    public actions: NgPersonsActions,
    public store: NgPersonsStore,
    public skysmackStore: NgSkysmackStore
  ) { }

  ngOnInit() {
    this.show();
    this.package$ = this.skysmackStore.getCurrentPackage(this.packagePath).pipe(map(x => x._package));
    this.actions.getPaged(this.packagePath, new PagedQuery());
    this.totalCount$ = this.store.getPages(this.packagePath).pipe(
      map(pages => {
        let totalCount = 0;
        Object.keys(pages).forEach(key => {
          totalCount = pages[key].totalCount;
        })
        return totalCount;
      })
    );
  }

  public show(): void {
    setTimeout(() => {
      this.dashboard.show$.next(true);
    }, 0);
  }

  public render(): void {
  }
}

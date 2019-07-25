import { Component, OnInit, Input } from '@angular/core';
import { NgPersonsActions, NgPersonsStore } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { Observable } from 'rxjs';
import { Package, PagedQuery } from '@skysmack/framework';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ss-persons-dashboard',
  templateUrl: './persons-dashboard.component.html',
  styleUrls: ['./persons-dashboard.component.scss']
})
export class PersonsDashboardComponent implements OnInit {
  @Input() packagePath: string;
  public package$: Observable<Package>;
  public totalCount$: Observable<number>;

  constructor(
    public actions: NgPersonsActions,
    public store: NgPersonsStore,
    public skysmackStore: NgSkysmackStore
  ) { }

  ngOnInit() {
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
    )
  }

}

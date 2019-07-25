import { Component, OnInit } from '@angular/core';
import { NgPersonsActions, NgPersonsStore } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PersonsTypeId } from '@skysmack/package-types';
import { Package, LocalObject } from '@skysmack/framework';

@Component({
  selector: 'skysmack-persons-dashboard',
  templateUrl: './persons-dashboard.component.html',
  styleUrls: ['./persons-dashboard.component.scss']
})
export class PersonsDashboardComponent implements OnInit {
  public personPackages$: Observable<LocalObject<Package, string>[]>;

  constructor(
    public actions: NgPersonsActions,
    public store: NgPersonsStore,
    public skysmackStore: NgSkysmackStore
  ) { }

  ngOnInit() {
    this.personPackages$ = this.skysmackStore.getPackages().pipe(map(packages => packages.filter(_package => _package.object.type === PersonsTypeId)));
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { NgPersonsActions, NgPersonsStore } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';

@Component({
  selector: 'skysmack-persons-dashboard',
  templateUrl: './persons-dashboard.component.html',
  styleUrls: ['./persons-dashboard.component.scss']
})
export class PersonsDashboardComponent implements OnInit {
  @Input() packagePath: string;

  constructor(
    public actions: NgPersonsActions,
    public store: NgPersonsStore,
    public skysmackStore: NgSkysmackStore
  ) { }

  ngOnInit() {
  }

}

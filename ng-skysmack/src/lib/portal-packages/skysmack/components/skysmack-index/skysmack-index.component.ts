import { Component, OnInit } from '@angular/core';
import { NgSkysmackRequests, NgSkysmackRedux } from 'lib/ng-packages';
import { NgRedux } from '@angular-redux/store';

@Component({
  selector: 'ss-skysmack-index',
  templateUrl: './skysmack-index.component.html',
  styleUrls: ['./skysmack-index.component.scss']
})
export class SkysmackIndexComponent implements OnInit {

  constructor(
    public skysmackRequests: NgSkysmackRequests,
    public skysmackRedux: NgSkysmackRedux,
    public ngRedux: NgRedux<any>
  ) { }

  ngOnInit() {
    this.ngRedux.dispatch({ type: 'GET_CURRENT_TENANT' });
  }
}

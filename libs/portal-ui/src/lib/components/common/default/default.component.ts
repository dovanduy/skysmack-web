import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgSignalR } from '@skysmack/ng-framework';
import { Router } from '@angular/router';
import { NgSkysmackActions } from '@skysmack/ng-skysmack';

@Component({
  selector: 'ss-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit, OnDestroy {
  public packagePath: string;

  constructor(
    public signalR: NgSignalR,
    public router: Router,
    public skysmackActions: NgSkysmackActions
  ) { }

  ngOnInit() {
    this.packagePath = this.router.url.split('/')[1];
    this.skysmackActions.getPermissions(this.packagePath);
    // TODO: REVIEW  SIGNAL-R
    // this.signalR.instance.join(this.packagePath);
  }

  ngOnDestroy() {
    // this.signalR.instance.leave(this.packagePath);
  }
}

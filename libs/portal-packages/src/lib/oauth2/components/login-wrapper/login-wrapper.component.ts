import { Component, OnInit } from '@angular/core';
import { DefaultComponent } from '@skysmack/portal-ui';
import { NgSignalR } from '@skysmack/ng-framework';
import { Router } from '@angular/router';
import { NgSkysmackActions } from '@skysmack/ng-skysmack';

@Component({
  selector: 'ss-login-wrapper',
  templateUrl: './login-wrapper.component.html',
  styleUrls: ['./login-wrapper.component.scss'],
})
export class LoginWrapperComponent extends DefaultComponent implements OnInit {

  constructor(
    public signalR: NgSignalR,
    public router: Router,
    public skysmackActions: NgSkysmackActions
  ) { super(signalR, router, skysmackActions); }

  ngOnInit() {
    super.ngOnInit();
  }
}

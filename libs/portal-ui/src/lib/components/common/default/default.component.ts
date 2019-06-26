import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgSignalR } from '@skysmack/ng-framework';
import { Router } from '@angular/router';

@Component({
  selector: 'ss-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit, OnDestroy {

  public packagePath: string;

  constructor(
    public signalR: NgSignalR,
    public router: Router
  ) { }

  ngOnInit() {
    console.log('initted');
    this.packagePath = this.router.url.split('/')[1];
    this.signalR.instance.join(this.packagePath);
  }

  ngOnDestroy() {
    console.log('Destroyed');
    this.signalR.instance.leave(this.packagePath);
  }
}

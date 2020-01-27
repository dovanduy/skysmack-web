import { Component, OnInit } from '@angular/core';
import { NgDoorwaysActions, NgDoorwaysStore } from '@skysmack/ng-doorways';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { PagedQuery } from '@skysmack/framework';
import { map } from 'rxjs/operators';
import { DashboardBase } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-doorways-dashboard',
  templateUrl: './doorways-dashboard.component.html',
  styleUrls: ['./doorways-dashboard.component.scss']
})
export class DoorwaysDashboardComponent extends DashboardBase implements OnInit {
  public elevation = 0;

  constructor(
    public actions: NgDoorwaysActions,
    public store: NgDoorwaysStore,
    public skysmackStore: NgSkysmackStore
  ) { super(skysmackStore); }

  ngOnInit() {
    super.ngOnInit();
    this.getDoorwaysCount();
    this.show();
    this.render();
  }

  private getDoorwaysCount() {
    this.package$ = this.skysmackStore.getCurrentPackage(this.packagePath).pipe(map(x => x._package));
    this.actions.getPaged(this.packagePath, new PagedQuery());
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

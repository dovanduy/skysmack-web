import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgSiteMinderStore, NgSiteMinderActions } from '@skysmack/ng-siteminder';
import { SiteMinderAppState, SITE_MINDER_AREA_KEY } from '@skysmack/packages-siteminder';
import { BaseComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-siteminder-index',
  templateUrl: './siteminder-index.component.html'
})
export class SiteMinderIndexComponent extends BaseComponent<SiteMinderAppState, unknown> implements OnInit {
  public static COMPONENT_KEY = 'siteminder-index';
  public componentKey = SiteMinderIndexComponent.COMPONENT_KEY;
  public areaKey: string = SITE_MINDER_AREA_KEY;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgSiteMinderActions,
    public skysmackStore: NgSkysmackStore,
    public store: NgSiteMinderStore,
  ) {
    super(router, activatedRoute, actions);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}

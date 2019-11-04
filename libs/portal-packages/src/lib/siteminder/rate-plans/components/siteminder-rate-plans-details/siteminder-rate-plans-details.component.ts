import { Component, OnInit } from '@angular/core';
import { EditorNavService } from '@skysmack/portal-ui';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgSiteMinderRatePlansActions, NgSiteMinderRatePlansStore } from '@skysmack/ng-siteminder';
import { SiteMinderRatePlansAppState } from '@skysmack/packages-siteminder';
import { DetailsBaseComponent } from '@skysmack/portal-fields';
import { NgSiteMinderRatePlansFieldsConfig } from '../../ng-siteminder-rate-plans-fields-config';

@Component({
  selector: 'ss-siteminder-rate-plans-details',
  templateUrl: './siteminder-rate-plans-details.component.html'
})
export class SiteMinderRatePlansDetailsComponent extends DetailsBaseComponent<SiteMinderRatePlansAppState, number> implements OnInit {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public actions: NgSiteMinderRatePlansActions,
    public store: NgSiteMinderRatePlansStore,
    public fieldsConfig: NgSiteMinderRatePlansFieldsConfig,
    public editorNavService: EditorNavService
  ) {
    super(router, activatedRoute, skysmackStore, actions, store, fieldsConfig, editorNavService);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}

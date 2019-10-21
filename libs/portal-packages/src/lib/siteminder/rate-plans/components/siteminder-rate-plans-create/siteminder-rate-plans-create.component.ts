import { Component, OnInit } from '@angular/core';
import { RatePlan, SiteMinderRatePlansAppState } from '@skysmack/packages-siteminder';
import { NgSiteMinderRatePlansActions, NgSiteMinderRatePlansStore } from '@skysmack/ng-siteminder';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { RecordFormComponent } from '@skysmack/portal-fields';
import { NgSiteMinderRatePlansFieldsConfig } from '../../ng-siteminder-rate-plans-fields-config';

@Component({
  selector: 'ss-siteminder-rate-plans-create',
  templateUrl: './siteminder-rate-plans-create.component.html'
})
export class SiteMinderRatePlansCreateComponent extends RecordFormComponent<SiteMinderRatePlansAppState, RatePlan, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgSiteMinderRatePlansActions,
    public skysmackStore: NgSkysmackStore,
    public fieldsConfig: NgSiteMinderRatePlansFieldsConfig,
    public store: NgSiteMinderRatePlansStore
  ) {
    super(router, activatedRoute, editorNavService, actions, skysmackStore, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }
}

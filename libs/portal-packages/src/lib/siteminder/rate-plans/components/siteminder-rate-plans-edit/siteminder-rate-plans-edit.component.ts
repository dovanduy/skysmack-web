import { Component, OnInit } from '@angular/core';
import { SiteMinderRatePlansAppState, RatePlan } from '@skysmack/packages-siteminder';
import { NgSiteMinderRatePlansActions, NgSiteMinderRatePlansStore } from '@skysmack/ng-siteminder';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { RecordFormComponent } from '@skysmack/portal-fields';
import { NgSiteMinderRatePlansFieldsConfig } from '../../ng-siteminder-rate-plans-fields-config';

@Component({
  selector: 'ss-siteminder-rate-plans-edit',
  templateUrl: './siteminder-rate-plans-edit.component.html'
})
export class SiteMinderRatePlansEditComponent extends RecordFormComponent<SiteMinderRatePlansAppState, RatePlan, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgSiteMinderRatePlansActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgSiteMinderRatePlansFieldsConfig,
    public store: NgSiteMinderRatePlansStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}

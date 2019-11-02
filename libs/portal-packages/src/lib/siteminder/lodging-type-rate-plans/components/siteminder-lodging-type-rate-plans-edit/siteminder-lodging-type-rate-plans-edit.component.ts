import { Component, OnInit } from '@angular/core';
import { SiteMinderLodgingTypeRatePlansAppState, LodgingTypeRatePlan, LodgingTypeRatePlanKey } from '@skysmack/packages-siteminder';
import { NgSiteMinderLodgingTypeRatePlansActions, NgSiteMinderLodgingTypeRatePlansStore } from '@skysmack/ng-siteminder';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { RecordFormComponent } from '@skysmack/portal-fields';
import { NgSiteMinderLodgingTypeRatePlansFieldsConfig } from '../../ng-siteminder-lodging-type-rate-plans-fields-config';

@Component({
  selector: 'ss-siteminder-lodging-type-rate-plans-edit',
  templateUrl: './siteminder-lodging-type-rate-plans-edit.component.html'
})
export class SiteMinderLodgingTypeRatePlansEditComponent extends RecordFormComponent<SiteMinderLodgingTypeRatePlansAppState, LodgingTypeRatePlan, LodgingTypeRatePlanKey> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgSiteMinderLodgingTypeRatePlansActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgSiteMinderLodgingTypeRatePlansFieldsConfig,
    public store: NgSiteMinderLodgingTypeRatePlansStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}

import { Component, OnInit } from '@angular/core';
import { SiteMinderLodgingTypeRatePlanChannelsAppState, LodgingTypeRatePlanChannel, LodgingTypeRatePlanChannelKey } from '@skysmack/packages-siteminder';
import { NgSiteMinderLodgingTypeRatePlanChannelsActions, NgSiteMinderLodgingTypeRatePlanChannelsStore } from '@skysmack/ng-siteminder';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { RecordFormComponent } from '@skysmack/portal-fields';
import { NgSiteMinderLodgingTypeRatePlanChannelsFieldsConfig } from '../../ng-siteminder-lodging-type-rate-plan-channels-fields-config';

@Component({
  selector: 'ss-siteminder-lodging-type-rate-plan-channels-edit',
  templateUrl: './siteminder-lodging-type-rate-plan-channels-edit.component.html'
})
export class SiteMinderLodgingTypeRatePlanChannelsEditComponent extends RecordFormComponent<SiteMinderLodgingTypeRatePlanChannelsAppState, LodgingTypeRatePlanChannel, LodgingTypeRatePlanChannelKey> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgSiteMinderLodgingTypeRatePlanChannelsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgSiteMinderLodgingTypeRatePlanChannelsFieldsConfig,
    public store: NgSiteMinderLodgingTypeRatePlanChannelsStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}

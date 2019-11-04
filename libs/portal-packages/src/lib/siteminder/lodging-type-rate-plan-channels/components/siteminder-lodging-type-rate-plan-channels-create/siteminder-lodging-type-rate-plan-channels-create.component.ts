import { Component, OnInit } from '@angular/core';
import { LodgingTypeRatePlanChannel, SiteMinderLodgingTypeRatePlanChannelsAppState, LodgingTypeRatePlanChannelKey, LodgingTypeRatePlanKey } from '@skysmack/packages-siteminder';
import { NgSiteMinderLodgingTypeRatePlanChannelsActions, NgSiteMinderLodgingTypeRatePlanChannelsStore } from '@skysmack/ng-siteminder';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { RecordFormComponent } from '@skysmack/portal-fields';
import { NgSiteMinderLodgingTypeRatePlanChannelsFieldsConfig } from '../../ng-siteminder-lodging-type-rate-plan-channels-fields-config';
import { FormHelper } from '@skysmack/ng-dynamic-forms';
import { toLocalObject, LocalObject } from '@skysmack/framework';

@Component({
  selector: 'ss-siteminder-lodging-type-rate-plan-channels-create',
  templateUrl: './siteminder-lodging-type-rate-plan-channels-create.component.html'
})
export class SiteMinderLodgingTypeRatePlanChannelsCreateComponent extends RecordFormComponent<SiteMinderLodgingTypeRatePlanChannelsAppState, LodgingTypeRatePlanChannel, LodgingTypeRatePlanChannelKey> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgSiteMinderLodgingTypeRatePlanChannelsActions,
    public skysmackStore: NgSkysmackStore,
    public fieldsConfig: NgSiteMinderLodgingTypeRatePlanChannelsFieldsConfig,
    public store: NgSiteMinderLodgingTypeRatePlanChannelsStore
  ) {
    super(router, activatedRoute, editorNavService, actions, skysmackStore, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }

  protected create(fh: FormHelper) {
    fh.formValid(() => {
      const localObject = this.extractFormValues(fh) as unknown as LocalObject<{ channelId: number, lodgingTypeRatePlanId: LodgingTypeRatePlanKey }, LodgingTypeRatePlanChannelKey>;
      const lodgingTypeRatePlanChannel = toLocalObject<LodgingTypeRatePlanChannel, LodgingTypeRatePlanChannelKey>(new LodgingTypeRatePlanChannel({
        lodgingTypeId: localObject.object.lodgingTypeRatePlanId.lodgingTypeId,
        ratePlanId: localObject.object.lodgingTypeRatePlanId.ratePlanId,
        channelId: localObject.object.channelId
      }));

      this.editorItem ? localObject.localId = this.editorItem.localId : lodgingTypeRatePlanChannel.localId = lodgingTypeRatePlanChannel.localId;

      this.actions.add([lodgingTypeRatePlanChannel], this.packagePath);
      this.editorNavService.hideEditorNav();
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { SiteMinderChannelsAppState, Channel } from '@skysmack/packages-siteminder';
import { NgSiteMinderChannelsActions, NgSiteMinderChannelsStore } from '@skysmack/ng-siteminder';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { RecordFormComponent } from '@skysmack/portal-fields';
import { NgSiteMinderChannelsFieldsConfig } from '../../ng-siteminder-channels-fields-config';

@Component({
  selector: 'ss-siteminder-channels-edit',
  templateUrl: './siteminder-channels-edit.component.html'
})
export class SiteMinderChannelsEditComponent extends RecordFormComponent<SiteMinderChannelsAppState, Channel, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgSiteMinderChannelsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgSiteMinderChannelsFieldsConfig,
    public store: NgSiteMinderChannelsStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}

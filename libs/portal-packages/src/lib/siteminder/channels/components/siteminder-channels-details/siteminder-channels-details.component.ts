import { Component, OnInit } from '@angular/core';
import { EditorNavService } from '@skysmack/portal-ui';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgSiteMinderChannelsActions, NgSiteMinderChannelsStore } from '@skysmack/ng-siteminder';
import { SiteMinderChannelsAppState } from '@skysmack/packages-siteminder';
import { DetailsBaseComponent } from '@skysmack/portal-fields';
import { NgSiteMinderChannelsFieldsConfig } from '../../ng-siteminder-channels-fields-config';

@Component({
  selector: 'ss-siteminder-channels-details',
  templateUrl: './siteminder-channels-details.component.html'
})
export class SiteMinderChannelsDetailsComponent extends DetailsBaseComponent<SiteMinderChannelsAppState, number> implements OnInit {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public actions: NgSiteMinderChannelsActions,
    public store: NgSiteMinderChannelsStore,
    public fieldsConfig: NgSiteMinderChannelsFieldsConfig,
    public editorNavService: EditorNavService
  ) {
    super(router, activatedRoute, skysmackStore, actions, store, fieldsConfig, editorNavService);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}

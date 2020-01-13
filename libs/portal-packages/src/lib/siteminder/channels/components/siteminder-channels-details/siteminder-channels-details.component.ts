import { Component, OnInit } from '@angular/core';
import { EditorNavService, EntityComponentPageTitle } from '@skysmack/portal-ui';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgSiteMinderChannelsActions, NgSiteMinderChannelsStore } from '@skysmack/ng-siteminder';
import { SiteMinderChannelsAppState, Channel } from '@skysmack/packages-siteminder';
import { DetailsBaseComponent } from '@skysmack/portal-fields';
import { NgSiteMinderChannelsFieldsConfig } from '../../ng-siteminder-channels-fields-config';
import { LocalObject } from '@skysmack/framework';

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
    public editorNavService: EditorNavService,
    public title: EntityComponentPageTitle
  ) {
    super(router, activatedRoute, skysmackStore, actions, store, fieldsConfig, editorNavService, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  protected getTitle(record: LocalObject<Channel, number>): string {
    return `${record.object.name}`;
  }
}

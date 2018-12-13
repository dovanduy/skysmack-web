import { Component, OnInit } from '@angular/core';
import { NgPackagesActions } from 'lib/ng-packages/packages/redux/ng-packages-actions';
import { NgSkysmackStore } from 'lib/ng-packages/skysmack/redux/ng-skysmack-store';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from 'lib/portal-ui/components/common/container/editor-nav.service';
import { NgPackagesFieldsConfig } from 'lib/ng-packages/packages/ng-packages-fields-config';
import { NgPackagesStore } from 'lib/ng-packages/packages';

@Component({
  selector: 'ss-packages-edit',
  templateUrl: './packages-edit.component.html',
  styleUrls: ['./packages-edit.component.scss']
})
export class PackagesEditComponent implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgPackagesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgPackagesFieldsConfig,
    public store: NgPackagesStore,
  ) {
    // super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
  }
}

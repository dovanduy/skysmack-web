import { Component, OnInit } from '@angular/core';
import { EditorNavService } from '@skysmack/portal-ui';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgPersonsActions, NgPersonsStore } from '@skysmack/ng-persons';
import { PersonsAppState } from '@skysmack/packages-persons';
import { NgPersonsFieldsConfig } from '../../../ng-persons-fields-config';
import { DetailsBaseComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-persons-details',
  templateUrl: './persons-details.component.html'
})
export class PersonsDetailsComponent extends DetailsBaseComponent<PersonsAppState, number> implements OnInit {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public actions: NgPersonsActions,
    public store: NgPersonsStore,
    public fieldsConfig: NgPersonsFieldsConfig,
    public editorNavService: EditorNavService
  ) {
    super(router, activatedRoute, skysmackStore, actions, store, fieldsConfig, editorNavService);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}

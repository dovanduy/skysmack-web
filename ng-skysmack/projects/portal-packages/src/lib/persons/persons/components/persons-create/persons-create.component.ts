import { Component, OnInit } from '@angular/core';
import { Person, PersonsAppState } from '@skysmack/packages-persons';
import { NgPersonsActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { DocumentRecordFormComponent } from '@skysmack/portal-ui';
import { NgPersonsStore } from '@skysmack/ng-packages';
import { NgFieldActions } from '@skysmack/ng-redux';
import { NgPersonsFieldsConfig } from '../../../ng-persons-fields-config';

@Component({
  selector: 'ss-persons-create',
  templateUrl: './persons-create.component.html'
})
export class PersonsCreateComponent extends DocumentRecordFormComponent<PersonsAppState, Person, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgPersonsActions,
    public skysmackStore: NgSkysmackStore,
    public fieldsConfig: NgPersonsFieldsConfig,
    public store: NgPersonsStore,
    public fieldActions: NgFieldActions
  ) {
    super(router, activatedRoute, editorNavService, actions, skysmackStore, store, fieldsConfig, fieldActions);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }
}

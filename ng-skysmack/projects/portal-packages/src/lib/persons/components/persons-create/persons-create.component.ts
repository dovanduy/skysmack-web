import { Component, OnInit } from '@angular/core';
import { Person, PersonsAppState } from '@skysmack/packages-persons';
import { NgPersonsActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgPersonsFieldsConfig, NgPersonFormDependencies } from '@skysmack/ng-packages';
import { DocumentRecordFormComponent } from '@skysmack/portal-ui';
import { NgPersonsStore } from '@skysmack/ng-packages';

@Component({
  selector: 'ss-persons-create',
  templateUrl: './persons-create.component.html',
  styleUrls: ['./persons-create.component.scss']
})
export class PersonsCreateComponent extends DocumentRecordFormComponent<PersonsAppState, Person, number, NgPersonFormDependencies> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgPersonsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgPersonsFieldsConfig,
    public store: NgPersonsStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }
}

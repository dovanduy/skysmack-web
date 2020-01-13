import { Component, OnInit } from '@angular/core';
import { EditorNavService, EntityComponentPageTitle } from '@skysmack/portal-ui';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgPersonsActions, NgPersonsStore } from '@skysmack/ng-persons';
import { PersonsAppState, Person } from '@skysmack/packages-persons';
import { NgPersonsFieldsConfig } from '../../../ng-persons-fields-config';
import { DetailsBaseComponent } from '@skysmack/portal-fields';
import { PersonsIndexComponent } from '../persons-index/persons-index.component';
import { LocalObject } from '@skysmack/framework';

@Component({
  selector: 'ss-persons-details',
  templateUrl: './persons-details.component.html'
})
export class PersonsDetailsComponent extends DetailsBaseComponent<PersonsAppState, number> implements OnInit {

  public componentKey = PersonsIndexComponent.COMPONENT_KEY;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public actions: NgPersonsActions,
    public store: NgPersonsStore,
    public fieldsConfig: NgPersonsFieldsConfig,
    public editorNavService: EditorNavService,
    public title: EntityComponentPageTitle
  ) {
    super(router, activatedRoute, skysmackStore, actions, store, fieldsConfig, editorNavService, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  protected getTitle(record: LocalObject<Person, number>): string {
    return `${record.object.displayName}`;
  }
}

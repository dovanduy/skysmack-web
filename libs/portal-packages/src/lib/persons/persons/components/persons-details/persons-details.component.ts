import { Component, OnInit } from '@angular/core';
import { BaseComponent, EditorNavService } from '@skysmack/portal-ui';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { Observable, combineLatest } from 'rxjs';
import { Field } from '@skysmack/ng-ui';
import { switchMap } from 'rxjs/operators';
import { NgPersonsActions, NgPersonsStore } from '@skysmack/ng-packages';
import { PersonsAppState } from '@skysmack/packages-persons';
import { NgPersonsFieldsConfig } from '../../../ng-persons-fields-config';

@Component({
  selector: 'ss-persons-details',
  templateUrl: './persons-details.component.html'
})
export class PersonsDetailsComponent extends BaseComponent<PersonsAppState, number> implements OnInit {

  public fields$: Observable<Field[]>;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public actions: NgPersonsActions,
    public store: NgPersonsStore,
    public fieldsConfig: NgPersonsFieldsConfig,
    public editorNavService: EditorNavService
  ) {
    super(router, activatedRoute, skysmackStore);
  }

  ngOnInit() {
    super.ngOnInit();
    this.editorNavService.showEditorNav();
    this.actions.getSingle(this.packagePath, this.entityId);

    this.fields$ = combineLatest(
      this.loadedPackage$,
      this.store.getSingle(this.packagePath, this.entityId)
    ).pipe(switchMap(values => this.fieldsConfig.getFields(values[0], values[1])));
  }

}

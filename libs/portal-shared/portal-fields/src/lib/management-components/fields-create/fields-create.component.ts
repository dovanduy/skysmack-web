import { Component, OnInit, Injector } from '@angular/core';
import { FieldState } from '@skysmack/redux';
import { Router, ActivatedRoute } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgFieldsConfig } from './../../ng-fields-config';
import { NgFieldActions, NgFieldStore } from '@skysmack/ng-framework';
import { FormHelper } from '@skysmack/ng-dynamic-forms';
import { RecordFormComponent } from '../../base-components/record-components/record-form-component';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';

@Component({
  selector: 'ss-fields-create',
  templateUrl: './fields-create.component.html'
})
export class FieldsCreateComponent extends RecordFormComponent<FieldState, any, string> implements OnInit {
  public objectIdentifier = 'key';
  private additionalPaths$: Observable<string[]>

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgFieldActions,
    public store: NgFieldStore,
    public skysmackStore: NgSkysmackStore,
    public fieldsConfig: NgFieldsConfig,
    public injector: Injector
  ) {
    super(router, activatedRoute, editorNavService, actions, skysmackStore, store, fieldsConfig);
  }

  ngOnInit() {
    this.additionalPaths$ = this.activatedRoute.parent.data.pipe(map(data => data.additionalPaths));
    super.ngOnInit();
    this.additionalPaths$.pipe(
      tap(additionalPaths => this.actions.getAvailableFields(this.packagePath, additionalPaths)),
      take(1)
    ).subscribe();

    this.setCreateFields();
  }

  protected create(fh: FormHelper) {
    fh.formValid(() => {
      const localObject = this.extractFormValues(fh);
      this.editorItem ? localObject.localId = this.editorItem.localId : localObject.localId = localObject.localId;

      return this.additionalPaths$.pipe(
        map(additionalPaths => {
          this.actions.add([localObject], this.packagePath, additionalPaths);
          this.editorNavService.hideEditorNav();
        }),
        take(1)
      ).subscribe();
    });
  }
}

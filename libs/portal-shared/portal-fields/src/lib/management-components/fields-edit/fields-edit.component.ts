import { Component, OnInit, Injector } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FieldState } from '@skysmack/redux';
import { NgFieldStore, NgFieldActions } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgFieldsConfig } from './../../ng-fields-config';
import { FormHelper } from '@skysmack/ng-dynamic-forms';
import { getFieldStateKey, LocalObjectStatus } from '@skysmack/framework';
import { RecordFormComponent } from '../../base-components/record-components/record-form-component';
import { tap, map, take, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'ss-portal-ui-fields-edit',
  templateUrl: './fields-edit.component.html'
})
export class FieldsEditComponent extends RecordFormComponent<FieldState, any, string> implements OnInit {
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
    this.setEditFields();
  }

  protected initEditRecord() {
    return this.additionalPaths$.pipe(
      switchMap(additionalPaths => {
        this.actions.getSingle(this.packagePath, this.entityId, additionalPaths);
        return this.store.getSingle(getFieldStateKey(this.packagePath, additionalPaths), this.entityId);
      })
    );
  }

  protected update(fh: FormHelper) {
    fh.formValid(() => {
      const oldValue = { ...this.selectedEntity };
      const newValue = this.extractFormValues(fh, this.selectedEntity);
      newValue.oldObject = oldValue.object;
      newValue.status = LocalObjectStatus.MODIFYING;

      return this.additionalPaths$.pipe(
        map(additionalPaths => {
          this.actions.update([newValue], this.packagePath, additionalPaths)
          this.editorNavService.hideEditorNav();
        }),
        take(1)
      ).subscribe();
    });
  }
}

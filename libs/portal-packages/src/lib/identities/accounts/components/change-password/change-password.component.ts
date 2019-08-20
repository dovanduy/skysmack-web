import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormHelper, Field } from '@skysmack/ng-dynamic-forms';
import { NgChangePasswordFieldsConfig } from '../../ng-change-password-fields-config';
import { Observable } from 'rxjs';
import { EditorNavService } from '@skysmack/portal-ui';
import { AccountAppState } from '@skysmack/packages-identities';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { switchMap, take, tap, map } from 'rxjs/operators';
import { NgAccountRequests } from '@skysmack/ng-identities';
import { BaseComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'skysmack-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent extends BaseComponent<AccountAppState, unknown> implements OnInit, OnDestroy {

  public fields$: Observable<Field[]>;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public fieldsConfig: NgChangePasswordFieldsConfig,
    public editorNavService: EditorNavService,
    public accountRequest: NgAccountRequests
  ) {
    super(router, activatedRoute, skysmackStore);
  }

  ngOnInit() {
    super.ngOnInit();
    this.fields$ = this.loadedPackage$.pipe(
      switchMap(loadedPackage => this.fieldsConfig.getFields(loadedPackage))
    );
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    this.editorNavService.hideEditorNav();
  }

  public onSubmit(fh: FormHelper) {
    fh.formValid(() => {
      this.accountRequest.changePassword(this.packagePath, fh.form.value).pipe(
        map(() => this.router.navigate([this.packagePath])),
        take(1)
      ).subscribe();
    });
  }
}

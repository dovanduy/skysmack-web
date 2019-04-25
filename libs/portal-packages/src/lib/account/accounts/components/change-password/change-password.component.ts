import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormHelper, Field } from '@skysmack/ng-ui';
import { NgChangePasswordFieldsConfig } from '../../ng-change-password-fields-config';
import { Observable } from 'rxjs';
import { BaseComponent, EditorNavService } from '@skysmack/portal-ui';
import { AccountAppState } from '@skysmack/packages-account';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { switchMap, take, tap } from 'rxjs/operators';
import { NgAccountRequests } from '@skysmack/ng-packages';

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
    this.editorNavService.showEditorNav();
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
      this.accountRequest.changePassword(this.packagePath, fh.form.value).pipe(take(1)).subscribe();
      this.router.navigate([this.packagePath]);
    });
  }
}

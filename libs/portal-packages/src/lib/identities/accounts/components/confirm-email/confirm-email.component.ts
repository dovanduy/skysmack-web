import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormHelper, Field } from '@skysmack/ng-dynamic-forms';
import { Observable } from 'rxjs';
import { EditorNavService } from '@skysmack/portal-ui';
import { AccountAppState } from '@skysmack/packages-identities';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { switchMap, take } from 'rxjs/operators';
import { BaseComponent } from '@skysmack/portal-fields';
import { NgConfirmEmailFieldsConfig } from '../../ng-confirm-email-fields-config';
import { NgAccountRequests } from '@skysmack/ng-identities';

@Component({
  selector: 'skysmack-confirm-email',
  templateUrl: './confirm-email.component.html'
})
export class ConfirmEmailComponent extends BaseComponent<AccountAppState, unknown> implements OnInit, OnDestroy {

  public fields$: Observable<Field[]>;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public fieldsConfig: NgConfirmEmailFieldsConfig,
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
      this.accountRequest.confirmEmail(this.packagePath, fh.form.value).pipe(take(1)).subscribe();
      this.router.navigate([this.packagePath]);
    });
  }
}

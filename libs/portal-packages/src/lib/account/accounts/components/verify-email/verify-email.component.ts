import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgVerifyEmailFieldsConfig } from './ng-verify-email-fields-config';
import { Router, ActivatedRoute } from '@angular/router';
import { toLocalObject } from '@skysmack/framework';
import { FormHelper, Field } from '@skysmack/ng-ui';
import { Observable } from 'rxjs';
import { BaseComponent, EditorNavService } from '@skysmack/portal-ui';
import { AccountAppState } from '@skysmack/packages-account';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgAccountRequests } from '@skysmack/ng-packages';

@Component({
  selector: 'ss-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent extends BaseComponent<AccountAppState, unknown> implements OnInit, OnDestroy {

  public fields$: Observable<Field[]>;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public fieldsConfig: NgVerifyEmailFieldsConfig,
    public editorNavService: EditorNavService,
    public accountRequest: NgAccountRequests
  ) {
    super(router, activatedRoute, skysmackStore);
  }

  ngOnInit() {
    super.ngOnInit();
    this.editorNavService.showEditorNav();

    const token = this.router.url.split('=')[1];
    if (token) {
      const tokenObject = toLocalObject(token);
      this.fields$ = this.fieldsConfig.getFields(undefined, tokenObject);
      this.submit({ token });
    } else {
      this.fields$ = this.fieldsConfig.getFields(undefined);
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.editorNavService.hideEditorNav();
  }

  public onSubmit(fh: FormHelper) {
    fh.formValid(() => {
      this.submit(fh.form.value);
    }, false);
  }

  private submit(tokenObject: { token: string }) {
    const token = tokenObject.token;
    console.log(token);
  }
}

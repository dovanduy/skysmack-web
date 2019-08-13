import { Component, OnInit } from '@angular/core';
import { CommercialAccountChangePasswordFieldsConfig } from './commercial-account-change-password-fields-config';
import { Observable } from 'rxjs';
import { Field, FormHelper } from '@skysmack/ng-dynamic-forms';
import { CommercialAccountService } from '../../services/commercial-account.service';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'ss-commercial-account-change-password',
  templateUrl: './commercial-account-change-password.component.html',
  styleUrls: ['./commercial-account-change-password.component.scss']
})
export class CommercialAccountChangePasswordComponent implements OnInit {

  public fields$: Observable<Field[]>;

  constructor(
    private fieldsConfig: CommercialAccountChangePasswordFieldsConfig,
    private service: CommercialAccountService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fields$ = this.fieldsConfig.getFields(null);
  }

  public onSubmit(fh: FormHelper) {
    fh.formValid(() => {
      this.service.changePassword(fh.form.value).pipe(
        map(() => this.router.navigate(['/', 'account', 'dashboard'])),
        take(1)
      ).subscribe();
    });
  }
}

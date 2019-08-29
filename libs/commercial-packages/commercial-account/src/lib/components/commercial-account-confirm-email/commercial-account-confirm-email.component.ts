import { Component, OnInit } from '@angular/core';
import { Field, FormHelper } from '@skysmack/ng-dynamic-forms';
import { Observable, of } from 'rxjs';
import { CommercialAccountConfirmEmailFieldsConfig } from './commercial-account-confirm-email-fields-config';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ss-commercial-account-confirm-email',
  templateUrl: './commercial-account-confirm-email.component.html',
  styleUrls: ['./commercial-account-confirm-email.component.scss']
})
export class CommercialAccountConfirmEmailComponent implements OnInit {

  public fields$: Observable<Field[]>;

  constructor(
    public fieldsConfig: CommercialAccountConfirmEmailFieldsConfig,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.fields$ = this.activatedRoute.queryParams.pipe(
      map(queryParam => {
        return this.fieldsConfig.getFields(queryParam['email'], queryParam['token']);
      })
    );
  }

  public onSubmit(fh: FormHelper) {
    fh.formValid(() => {
      console.log(fh.form);
      this.router.navigate(['account', 'dashboard']);
    }, false);
  }
}

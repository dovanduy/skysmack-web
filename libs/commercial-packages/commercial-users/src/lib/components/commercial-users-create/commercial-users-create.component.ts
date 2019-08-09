import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Field, FormHelper } from '@skysmack/ng-dynamic-forms';
import { SubscriptionHandler } from '@skysmack/framework';
import { NgRedux } from '@angular-redux/store';
import { Router } from '@angular/router';
import { CommercialUsersService } from '../../services/commercial-users.service';
import { CommercialUsersFieldsConfig } from '../../commercial-users-fields-config';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'ss-commercial-users-create',
  templateUrl: './commercial-users-create.component.html',
  styleUrls: ['./commercial-users-create.component.scss'],
})
export class CommercialUsersCreateComponent implements OnInit {
  public fields$: Observable<Field[]>;
  public subscriptionHandler = new SubscriptionHandler();

  constructor(
    public router: Router,
    public fieldsConfig: CommercialUsersFieldsConfig,
    public ngRedux: NgRedux<any>,
    public service: CommercialUsersService
  ) { }

  ngOnInit() {
    this.fieldsConfig.mode = 'create';
    this.fields$ = of(this.fieldsConfig.getFields());
  }

  public onSubmit(fh: FormHelper) {
    fh.formValid(() => {
      const user = fh.form.getRawValue();
      this.service.add(user).pipe(
        tap(() => this.router.navigate(['/', 'users'])),
        take(1)
      ).subscribe();
    }, false);
  }
}

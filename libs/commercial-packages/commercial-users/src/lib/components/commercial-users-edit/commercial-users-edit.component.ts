import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Field, FormHelper } from '@skysmack/ng-dynamic-forms';
import { SubscriptionHandler, HttpSuccessResponse, toLocalObject } from '@skysmack/framework';
import { NgRedux } from '@angular-redux/store';
import { Router, ActivatedRoute } from '@angular/router';
import { CommercialUsersService } from '../../services/commercial-users.service';
import { CommercialUsersFieldsConfig } from '../../commercial-users-fields-config';
import { take, tap, map, switchMap } from 'rxjs/operators';
import { PartnerUser } from '../../models/partner-user';

@Component({
  selector: 'ss-commercial-users-edit',
  templateUrl: './commercial-users-edit.component.html',
  styleUrls: ['./commercial-users-edit.component.scss'],
})
export class CommercialUsersEditComponent implements OnInit, OnDestroy {
  public fields$: Observable<Field[]>;
  private subscriptionHandler = new SubscriptionHandler();

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public fieldsConfig: CommercialUsersFieldsConfig,
    public ngRedux: NgRedux<any>,
    public service: CommercialUsersService
  ) { }

  ngOnInit() {
    this.fieldsConfig.mode = 'edit';
    this.fields$ = this.activatedRoute.params.pipe(
      map(params => params.id),
      switchMap(id => this.service.getById(id)),
      switchMap((response: HttpSuccessResponse<PartnerUser>) => this.fieldsConfig.getFields(null, toLocalObject(response.body)))
    );
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  public onSubmit(fh: FormHelper) {
    fh.formValid(() => {
      const user = fh.form.getRawValue();
      this.subscriptionHandler.register(this.service.update(user).pipe(
        tap(() => this.router.navigate(['/', 'users'])),
        take(1)
      ).subscribe());
    }, false);
  }
}

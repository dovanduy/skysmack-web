import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Field, FormHelper } from '@skysmack/ng-dynamic-forms';
import { SubscriptionHandler, toLocalObject } from '@skysmack/framework';
import { tap, take, switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { CommercialUsersRolesFieldsConfig } from './commercial-users-roles-fields-config';
import { CommercialUsersService } from '../../services/commercial-users.service';
import { PartnerUserRole } from '../../models/partner-user-role';

@Component({
  selector: 'ss-commercial-users-roles',
  templateUrl: './commercial-users-roles.component.html',
  styleUrls: ['./commercial-users-roles.component.scss']
})
export class CommercialUsersRolesComponent implements OnInit {
  public fields$: Observable<Field[]>;
  public subscriptionHandler = new SubscriptionHandler();

  constructor(
    private service: CommercialUsersService,
    private fieldsConfig: CommercialUsersRolesFieldsConfig,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.fields$ = this.activatedRoute.params.pipe(
      switchMap(params => this.fieldsConfig.getFields(null, toLocalObject(new PartnerUserRole({
        userId: params.userId,
        roleName: undefined,
      }))))
    );
  }

  public onSubmit(fh: FormHelper) {
    fh.formValid(() => {
      const partnerUserRole = fh.form.getRawValue();
      this.service.addRoleToUser(partnerUserRole).pipe(
        tap(() => this.router.navigate(['/', 'users'])),
        take(1)
      ).subscribe();
    }, false);
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }
}

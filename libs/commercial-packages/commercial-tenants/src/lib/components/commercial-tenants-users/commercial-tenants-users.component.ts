import { Component, OnInit } from '@angular/core';
import { CommercialTenantsService } from '../../services/commercial-tenants.service';
import { Observable } from 'rxjs';
import { Field, FormHelper } from '@skysmack/ng-dynamic-forms';
import { SubscriptionHandler, toLocalObject } from '@skysmack/framework';
import { CommercialTenantsUsersFieldsConfig } from './commercial-tenants-users-fields-config';
import { tap, take, switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { PartnerTenant, PartnerTenantStatus } from '../../models';

@Component({
  selector: 'ss-commercial-tenants-users',
  templateUrl: './commercial-tenants-users.component.html',
  styleUrls: ['./commercial-tenants-users.component.scss']
})
export class CommercialTenantsUsersComponent implements OnInit {
  public fields$: Observable<Field[]>;
  public subscriptionHandler = new SubscriptionHandler();

  constructor(
    private service: CommercialTenantsService,
    private fieldsConfig: CommercialTenantsUsersFieldsConfig,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.fields$ = this.activatedRoute.params.pipe(
      switchMap(params => this.fieldsConfig.getFields(null, toLocalObject(new PartnerTenant({
        userId: params.userId,
        tenantId: undefined,
        status: PartnerTenantStatus.partner
      }))))
    );
  }

  public onSubmit(fh: FormHelper) {
    fh.formValid(() => {
      const partnerTenant = fh.form.getRawValue();
      this.service.relateTenantAndUser(partnerTenant).pipe(
        tap(() => this.router.navigate(['/', 'account', 'dashboard'])),
        take(1)
      ).subscribe();
    }, false);
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }
}

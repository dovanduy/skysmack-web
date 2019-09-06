import { Component, OnInit } from '@angular/core';
import { CommercialTenantsService } from '../../services/commercial-tenants.service';
import { Observable } from 'rxjs';
import { Field, FormHelper } from '@skysmack/ng-dynamic-forms';
import { SubscriptionHandler } from '@skysmack/framework';
import { CommercialTenantsUsersFieldsConfig } from './commercial-tenants-users-fields-config';
import { tap, take } from 'rxjs/operators';
import { Router } from '@angular/router';

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
    public router: Router
  ) { }

  ngOnInit() {
    this.fields$ = this.fieldsConfig.getFields(null, null);
  }

  public onSubmit(fh: FormHelper) {
    fh.formValid(() => {
      const partnerTenant = fh.form.getRawValue();
      console.log(partnerTenant);
      // this.service.add(tenant).pipe(
      //   tap(() => this.router.navigate(['/', 'tenants'])),
      //   take(1)
      // ).subscribe();
    }, false);
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }
}

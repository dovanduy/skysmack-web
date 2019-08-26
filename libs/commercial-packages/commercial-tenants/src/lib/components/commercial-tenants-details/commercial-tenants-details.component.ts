import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommercialTenantsService } from '../../services/commercial-tenants.service';
import { Tenant } from '../../models/tenant';
import { map, switchMap } from 'rxjs/operators';
import { HttpSuccessResponse } from '@skysmack/framework';
import { ActivatedRoute } from '@angular/router';
import { TenantStates } from '../../models/tenant-states';

@Component({
  selector: 'ss-commercial-tenants-details',
  templateUrl: './commercial-tenants-details.component.html',
  styleUrls: ['./commercial-tenants-details.component.scss']
})
export class CommercialTenantsDetailsComponent implements OnInit {

  public tenant$: Observable<Tenant>

  constructor(
    public service: CommercialTenantsService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.tenant$ = this.activatedRoute.params.pipe(
      map(params => params.id),
      switchMap(id => this.service.getById(id)),
      map((response: HttpSuccessResponse<Tenant>) => response.body)
    );
  }

  public displayModifier = (entity: Tenant): string => {
    return TenantStates[entity.state];
  }
}

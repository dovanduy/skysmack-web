import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommercialTenantsService } from '../../services/commercial-tenants.service';
import { Tenant } from '../../models/tenant';
import { map, take } from 'rxjs/operators';
import { HttpResponse, HttpSuccessResponse } from '@skysmack/framework';

@Component({
  selector: 'ss-commercial-tenants-index',
  templateUrl: './commercial-tenants-index.component.html',
  styleUrls: ['./commercial-tenants-index.component.scss']
})
export class CommercialTenantsIndexComponent implements OnInit {

  public tenants$: Observable<Tenant[]>

  constructor(
    public service: CommercialTenantsService
  ) { }

  ngOnInit() {
    this.tenants$ = this.service.get().pipe(
      map((x: HttpSuccessResponse<Tenant[]>) => x.body),
      take(1)
    );
  }
}

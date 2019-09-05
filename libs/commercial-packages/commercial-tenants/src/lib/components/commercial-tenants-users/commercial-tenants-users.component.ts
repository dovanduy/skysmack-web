import { Component, OnInit } from '@angular/core';
import { CommercialTenantsService } from '../../services/commercial-tenants.service';

@Component({
  selector: 'ss-commercial-tenants-index',
  templateUrl: './commercial-tenants-index.component.html',
  styleUrls: ['./commercial-tenants-index.component.scss']
})
export class CommercialTenantsIndexComponent implements OnInit {

  constructor(
    private tenantsService: CommercialTenantsService,
    // private usersService: CommercialUsersService // IMPORT THIS
  ) { }

  ngOnInit() {
  }
}

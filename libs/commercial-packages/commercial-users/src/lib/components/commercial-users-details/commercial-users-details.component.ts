import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommercialUsersService } from '../../services/commercial-users.service';
import { map, switchMap } from 'rxjs/operators';
import { HttpSuccessResponse } from '@skysmack/framework';
import { ActivatedRoute } from '@angular/router';
import { PartnerUser } from '../../models';

@Component({
  selector: 'ss-commercial-users-details',
  templateUrl: './commercial-users-details.component.html',
  styleUrls: ['./commercial-users-details.component.scss']
})
export class CommercialUsersDetailsComponent implements OnInit {

  public user$: Observable<PartnerUser>

  constructor(
    public service: CommercialUsersService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.user$ = this.activatedRoute.params.pipe(
      map(params => params.id),
      switchMap(id => this.service.getById(id)),
      map((response: HttpSuccessResponse<PartnerUser>) => response.body)
    );
  }
}

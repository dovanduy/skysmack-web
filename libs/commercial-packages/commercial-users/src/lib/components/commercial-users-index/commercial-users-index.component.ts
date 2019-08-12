import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommercialUsersService } from '../../services/commercial-users.service';
import { map, take } from 'rxjs/operators';
import { HttpSuccessResponse } from '@skysmack/framework';
import { PartnerUser } from '../../models';

@Component({
  selector: 'ss-commercial-users-index',
  templateUrl: './commercial-users-index.component.html',
  styleUrls: ['./commercial-users-index.component.scss']
})
export class CommercialUsersIndexComponent implements OnInit {

  public users$: Observable<PartnerUser[]>

  constructor(
    public service: CommercialUsersService
  ) { }

  ngOnInit() {
    console.log('CommercialUsersIndexComponent');
    this.users$ = this.service.get().pipe(
      map((x: HttpSuccessResponse<PartnerUser[]>) => x.body),
      take(1)
    );
  }
}

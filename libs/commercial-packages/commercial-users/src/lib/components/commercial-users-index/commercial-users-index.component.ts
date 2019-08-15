import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommercialUsersService } from '../../services/commercial-users.service';
import { map, take } from 'rxjs/operators';
import { HttpSuccessResponse } from '@skysmack/framework';
import { PartnerUser } from '../../models';
import { MatDialog } from '@angular/material/dialog';
import { RemoveDialog, RemoveDialogData } from '@skysmack/commercial-ui-partners';

@Component({
  selector: 'ss-commercial-users-index',
  templateUrl: './commercial-users-index.component.html',
  styleUrls: ['./commercial-users-index.component.scss']
})
export class CommercialUsersIndexComponent implements OnInit {

  public users$: Observable<PartnerUser[]>

  constructor(
    public service: CommercialUsersService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.refreshUsers();
  }
  private refreshUsers() {
    
    this.users$ = this.service.get().pipe(
      map((x: HttpSuccessResponse<PartnerUser[]>) => x.body),
      take(1)
    );
  }
  

  public remove(user: PartnerUser): void {
    this.dialog.open(RemoveDialog, {
      width: '350px',
      data: new RemoveDialogData({ name: user.userName, removeMethod: () => { 
        this.service.delete(user.id).pipe(take(1)).subscribe();
        this.refreshUsers();
      }})
    });
}
}

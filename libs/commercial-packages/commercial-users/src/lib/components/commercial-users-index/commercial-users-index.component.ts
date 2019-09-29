import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { CommercialUsersService } from '../../services/commercial-users.service';
import { map, take, tap, switchMap, share } from 'rxjs/operators';
import { HttpSuccessResponse, StrIndex } from '@skysmack/framework';
import { MatDialog } from '@angular/material/dialog';
import { RemoveDialog, RemoveDialogData } from '@skysmack/commercial-ui-partners';
import { PartnerUser } from '../../models/partner-user';

class UserWithRoles extends PartnerUser {
  roles: string[];
}

@Component({
  selector: 'ss-commercial-users-index',
  templateUrl: './commercial-users-index.component.html',
  styleUrls: ['./commercial-users-index.component.scss']
})
export class CommercialUsersIndexComponent implements OnInit {
  public loading = true;
  public users$: Observable<UserWithRoles[]>

  constructor(
    public service: CommercialUsersService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.refreshUsers();
  }
  private refreshUsers() {

    const users$ = this.service.get().pipe(
      share(),
      map((x: HttpSuccessResponse<PartnerUser[]>) => x.body),
      take(1)
    );

    const roles$ = users$.pipe(
      switchMap(users => this.service.getUserRoles(users.map(user => user.id)).pipe(share())),
      map((x: HttpSuccessResponse<StrIndex<string[]>>) => x.body),
      take(1),
    );

    this.users$ = combineLatest([
      users$,
      roles$
    ]).pipe(
      map(([users, roles]) => {
        return users.map(user => {
          return {
            ...user,
            roles: roles[user.id]
          } as UserWithRoles
        })
      }),
      tap(() => this.loading = false)
    );
  }


  public remove(user: PartnerUser): void {
    this.dialog.open(RemoveDialog, {
      width: '350px',
      data: new RemoveDialogData({
        name: user.firstName + ' ' + user.lastName, removeMethod: () => {
          this.loading = true;
          this.service.delete(user.id).pipe(
            tap(() => {
              this.refreshUsers();
            }),
            take(1)).subscribe();
        }
      })
    });
  }
}

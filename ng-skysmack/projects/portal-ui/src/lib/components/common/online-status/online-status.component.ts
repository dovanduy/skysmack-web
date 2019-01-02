import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Menu } from '@skysmack/ng-ui';
import { UIRedux } from './../../../redux/ui-redux';

@Component({
  selector: 'ss-online-status',
  templateUrl: './online-status.component.html',
  styleUrls: ['./online-status.component.scss']
})
export class OnlineStatusComponent implements OnInit {

  public online$: Observable<boolean>;
  public menu$: Observable<Menu>;

  constructor(
    public redux: UIRedux
  ) { }

  ngOnInit() {
    this.online$ = this.redux.getOnlineStatus().pipe(map(online => !online));
    this.menu$ = this.redux.getMenu();
  }
}

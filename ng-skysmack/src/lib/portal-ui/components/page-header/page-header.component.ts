import { Component, EventEmitter, Output } from '@angular/core';
import { EntityComponentPageTitle } from 'framework';

@Component({
  selector: 'ss-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
  constructor(public _componentPageTitle: EntityComponentPageTitle) { }

  @Output() toggleSidenav = new EventEmitter<void>();
}

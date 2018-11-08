import { Component, EventEmitter, Output } from '@angular/core';
import { EntityComponentPageTitle } from 'lib/portal-ui/models/entity-component-page-title';

@Component({
  selector: 'ss-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
  constructor(public _componentPageTitle: EntityComponentPageTitle) { }

  @Output() toggleSidenav = new EventEmitter<void>();
}

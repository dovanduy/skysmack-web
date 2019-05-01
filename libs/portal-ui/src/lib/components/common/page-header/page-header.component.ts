import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { EntityComponentPageTitle } from './../../../models/entity-component-page-title';

@Component({
  selector: 'ss-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnDestroy {
  constructor(public _componentPageTitle: EntityComponentPageTitle) { }

  @Output() toggleSidenav = new EventEmitter<void>();

  ngOnDestroy() {
    // Ensures a previous components title isn't visible on the next component.
    this._componentPageTitle.title = '';
  }
}

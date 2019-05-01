import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { EntityComponentPageTitle } from './../../../models/entity-component-page-title';

@Component({
  selector: 'ss-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnDestroy {
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(
    public componentPageTitle: EntityComponentPageTitle
  ) { }

  ngOnDestroy() {
    // Ensures a previous components title isn't visible on the next component.
    this.componentPageTitle.title = '';
    this.componentPageTitle.titleExtraTranslationString = undefined;
  }
}

import { Component, EventEmitter, Output, OnDestroy, Input } from '@angular/core';
import { EntityComponentPageTitle } from './../../../models/entity-component-page-title';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ss-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnDestroy {
  @Output() toggleSidenav = new EventEmitter<void>();
  @Input() displaySidenavToggle = new EventEmitter<boolean>();

  constructor(
    public componentPageTitle: EntityComponentPageTitle
  ) { }

  ngOnDestroy() {
    // Ensures a previous components title isn't visible on the next component.
    this.componentPageTitle.title = '';
    this.componentPageTitle.titleExtraTranslationString = undefined;
  }
}

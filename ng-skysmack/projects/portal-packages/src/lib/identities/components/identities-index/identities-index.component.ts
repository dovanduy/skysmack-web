import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle } from '@skysmack/portal-ui';
import { NgIdentitiesIndexMenu } from '../../ng-identities-index-menu';

@Component({
  selector: 'ss-portal-package-identities-index',
  templateUrl: './identities-index.component.html',
  styleUrls: ['./identities-index.component.scss']
})
export class IdentitiesIndexComponent implements OnInit {

  constructor(
    public title: EntityComponentPageTitle,
    public sidebarMenu: NgIdentitiesIndexMenu
  ) { }

  ngOnInit() {
    this.title.setTitle('Assignments All');
  }
}

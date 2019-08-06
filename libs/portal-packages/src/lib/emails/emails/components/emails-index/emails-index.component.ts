import { Component, OnInit } from '@angular/core';
import { NgEmailsMenu } from '../../ng-emails-menu';

@Component({
  selector: 'ss-emails-index',
  templateUrl: './emails-index.component.html'
})
export class EmailsIndexComponent implements OnInit {
  public static COMPONENT_KEY = 'emails-index';
  public componentKey = EmailsIndexComponent.COMPONENT_KEY;

  constructor(
    public sidebarMenu: NgEmailsMenu,
  ) { }

  ngOnInit() {
  }
}

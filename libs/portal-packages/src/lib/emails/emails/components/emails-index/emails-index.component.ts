import { Component, OnInit } from '@angular/core';
import { NgEmailsMenu } from '../../ng-emails-menu';

@Component({
  selector: 'ss-emails-index',
  templateUrl: './emails-index.component.html'
})
export class EmailsIndexComponent implements OnInit {
  constructor(
    public sidebarMenu: NgEmailsMenu,
  ) { }

  ngOnInit() {
  }
}
